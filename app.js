var App = new Ext.application({
    name: 'Kio',

    requires: [
        'Ext.MessageBox',
		'Ext.TitleBar',
        'Ext.util.DelayedTask',        
        'Ext.form.FieldSet',
        'Ext.field.Select',
        'Ext.form.Email',
        'Ext.form.Toggle',
        'Ext.field.DatePicker',
        'Ext.util.Geolocation',
        'Ext.data.proxy.LocalStorage',
        'Ext.data.identifier.Uuid'
    ],
	
	controllers: ['Main'],
    views:  ['Main', 'Home', 'Report', 'News', 'About', 'Setting', 'TermsAndConditions', 'NewsList', 'NewsDetail', 'MakeReport', 'UpdateLocation'],
	stores: ['News', 'Ground', 'Config','Report'],
	models: ['News', 'Ground', 'Config','Report'],

    icon: {
        '57': 'resources/icons/Icon.png',				   // A list of the icons used when users add the app to their home screen on iOS devices
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        
        '320x460': 'resources/startup/320x460.jpg',			// If a user adds the app to their home screen on iOS
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

    launch: function() {

        // Destroy the #appLoadingIndicator element
        // Ext.fly('appLoadingIndicator').destroy();
        
        // the salesforce and salesforce.client object will be available across the app accessing it with "Kio.app.sf"
        this.sf = new salesforce('web_app','sandbox');  

        // Loads Grounds data into the Store via the configured proxy
        var groundsStore = Ext.getStore('Ground');
        groundsStore.load();


        // **** LOAD NEWS AT THE STARTUP in Background **** 
     
        // get news callout to https://<instance_url>/services/apexrest/kio/v1.0/getNews
        this.sf.client.apexrest( '/kio/v1.0/getNews', function(response){
            // success => save news in the localstorage
            var newsStore = Ext.getStore('News');
            
            //valid response is coming from SF as a string that must be parsed in order to get the right JS array of object
            var decoded_response = JSON.parse(response);
            //console.log(decoded_response);
            
            // testing porpuses 
            // getNews(response);


            // remove all
            newsStore.removeAll();
            newsStore.sync();
            // write all from sf
            for( var i = 0; i < decoded_response.length; i++ ){                
                if( newsStore.find('recordId',decoded_response[i]['recordId']) === -1 ){
                    newsStore.add(decoded_response[i]);                    
                }
            }
            newsStore.sync();

            
            // for( var i = 0; i < newsStore.getTotalCount() ; i++){
            //     console.log(newsStore.getAt(i));
            // }

            // set one as Other instead of Latest
            // var record = newsStore.findRecord('recordId','a01J0000003o6suIAA');
            // console.log(record);
            // record.set('type','Other');
            // newsStore.sync();            

            console.log('news loaded and saved successfully');

        }, function(response){
            // error
            console.log('load news error: ');
            console.log(response);

            if( response['status'] === 404 ){
                // token must be refreshed
                Kio.app.sf.client.refreshAccessToken(function(response){
                    // success
                    console.log('token refreshed');
                    console.log(response);

                    // set up the new token
                    Kio.app.sf.client.access_token = response['access_token'];
                    // update the new token for next access
                    // ***********************
                    // make another call in order to get the news
                    
                },function(response){
                    // error again => 
                    console.log('token refresh error');
                    console.log(response);
                });
            }else{
                // no internet connectivity =>
            }



        }, 'GET', null, null);

        // **** LOAD NEWS AT THE STARTUP in Background **** 


        // Using a delayedTask, after x ms
        Ext.create('Ext.util.DelayedTask', function() {
            // Gets the config storage
            var store = Ext.getStore('Config');
            // This is the config record Id in the local storage
            var configRecordId = '1';
            // Checks if the config record is in the local storage
            // If it is not there it means this is the first time the user launches the app
            var recordIdFromLocalStorage = store.find('recordId', configRecordId);            
            
            // *** No config stored before in the localStorage => the user runs the app for the first time ***
            if(recordIdFromLocalStorage === -1){ 
                // The data that is going to be sync
                var persistData = {
                    recordId: configRecordId,
                    pushNotifications: false
                }

                store.add(persistData);
                store.sync();  
                
                // loading terms and conditions screen + geolocation preferences the first time the user lunches the app
                loadTermsAndConditions();

                // first time the user launch the app the grounds are loaded
                // **** LOAD GROUNDS ****
                Kio.app.sf.client.apexrest( '/kio/v1.0/getGrounds', function(response){
                    // custom parsing => match model fields
                    var grounds = new Array();
                    for(var i in JSON.parse(response)){
                        
                        // recordId, groundName
                        var ground = {

                            recordId: JSON.parse(response)[i]['Id'],
                            groundName: JSON.parse(response)[i]['Name']

                        }
                        grounds.push(ground);
                    }
                    
                    // array of reports ready to be used in sencha => save grounds in the local storage
                    console.log('loaded grounds:');
                    console.log(grounds); 

                    // get the ground store
                    var ground_store = Ext.getStore('Ground');

                    //remove all
                    ground_store.removeAll();
                    ground_store.sync();
                    // add new/updated grounds
                    for(var i in grounds){
                        ground_store.add(grounds[i]);
                    }
                    ground_store.sync();


                }, function(response){
                    console.log('error loading grounds' + response);
                });
                // **** LOAD GROUNDS ****

            } else {
                // *** successive starts of the application ***

                // set the location
                var geo = Ext.create('Kio.view.UpdateLocation');
                geo.updateLocation();
            }

        }).delay(0);
    },

    onUpdated: function() {
        
        // just when the user updates the app the grounds will be updated
        // **** LOAD GROUNDS ****
        Kio.app.client.apexrest( '/kio/v1.0/getGrounds', function(response){
            // custom parsing => match model fields
            var grounds = new Array();
            for(var i in JSON.parse(response)){
                
                // recordId, groundName
                var ground = {

                    recordId: JSON.parse(response)[i]['Id'],
                    groundName: JSON.parse(response)[i]['Name']

                }
                grounds.push(ground);
            }
            
            // array of reports ready to be used in sencha => save grounds in the local storage
            console.log('loaded grounds:');
            console.log(grounds); 

            // get the ground store
            var ground_store = Ext.getStore('Ground');

            //remove all
            ground_store.removeAll();
            ground_store.sync();
            // add new/updated grounds
            for(var i in grounds){
                ground_store.add(grounds[i]);
            }
            ground_store.sync();


        }, function(response){
            console.log('error loading grounds' + response);
        });
        // **** LOAD GROUNDS ****


        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }    

    // functions defined here are accessible via Kio.app.<function_name>
});




// this.sf.client.apexrest( '/kio/v1.0/getReports', function(response){
   
//     // custom parsing => match model fields
//     var reports = new Array();
//     for(var i in JSON.parse(response)){
        
//         // fields: ['recordId', 'groundId', 'reportDate', 'description','name','phone','email','address']
//         var report = {
            
//             recordId: JSON.parse(response)[i]['Id'],
//             groundId: '',
//             reportDate: JSON.parse(response)[i]['When_did_it_happen__c  '],
//             description: '',
//             phone: '',
//             email: '',
//             address: ''
//         }
//         reports.push(report);

//         // console.log(JSON.parse(response)[i]);
//     }
    
//     // array of reports ready to be used in sencha
//     console.log(reports);

// }, function(){
//     console.log(response);
// });