Ext.application({
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
        'Ext.data.proxy.LocalStorage'
    ],
	
	controllers: ['Main'],
    views:  ['Main', 'Home', 'Report', 'News', 'About', 'Setting', 'TermsAndConditions', 'NewsList', 'NewsDetail', 'MakeReport', 'UpdateLocation'],
	stores: ['News', 'Ground', 'Config','Report'],
	models: ['News', 'Ground', 'Config','Report'],

    icon: {
        '57': 'resources/icons/Icon.png',				// A list of the icons used when users add the app to their home screen on iOS devices
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

        // **** salesforce integration *****

        // instanciating saleforce object (contains all the connection parameters)
        var sf = new salesforce();
        // getting connection parameters
        var sf_authParams = sf.getAuthenticationParameters();

        // ******* Web App => needs the proxy.php in order to work *******
        // var client = new forcetk.Client(sf_authParams.client_id, sf_authParams.login_url, sf_authParams.proxy_url);             
        // client.setSessionToken(sf_authParams.access_token, null, sf_authParams.instance_url);
        // client.setRefreshToken(sf_authParams.refresh_token);  
        // ******* Web app *******

        // ******* Phone app => doens't need the proxy.php in order to work; just use the build.phonegap.com service *******
        var client = new forcetk.Client(sf_authParams.client_id, sf_authParams.login_url);              
        client.setSessionToken(sf_authParams.access_token, null, sf_authParams.instance_url);
        client.setRefreshToken(sf_authParams.refresh_token);
        // ******* Phone app *******

        // debug for reference
        console.log(client);

        // execute query                
        client.query('SELECT Name FROM Account LIMIT 1', function(response){
            // success callback
            
            // for reference
            console.log(response);

            alert(response.records[0].Name);

            // show the response in the html page
            //$('#account').html(response.records[0].Name);

        }, function(response){
            // error callback
            console.log(response);
            alert(response.statusText);
        });              


        // **** salesforce integration *****
		
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
                //loadGrounds();

            } else {
                // *** successive starts of the application ***

                // set the location
                var geo = Ext.create('Kio.view.UpdateLocation');
                geo.updateLocation();                  
            } 

            // *** always load news at the start of the application *** 
            // loading news form salesforce at startup - a polling will update the news 
            //loadNews();

        }).delay(0);

    },

    onUpdated: function() {
        
        // just when the user updates the app the grounds will be updated
        loadGrounds();

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
});
