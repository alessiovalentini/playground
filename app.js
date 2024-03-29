var App = new Ext.application({
    name: 'Kio',

    requires: [
        // 'Ext.device.Connection',    // the EVENT is working only with sencha packager (only isOnline() is working otherwise)
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
        'Ext.data.identifier.Uuid',
        'Ext.ux.picker.DateTime',
        'Ext.ux.field.DateTimePicker',
        'Ext.ux.util.OnlineManager'    // connection checker (under sdk/src/ux/util)
    ],

	controllers: ['Main'],
    views:  ['Main', 'Home', 'Report', 'News', 'About', 'Setting', 'TermsAndConditions', 'NewsList', 'NewsDetail', 'MakeReport', 'UpdateLocation'],
	stores: ['News', 'Ground', 'Config','Report'],
	models: ['News', 'Ground', 'Config','Report'],

    // web app full screen
    // viewport: {
    //     autoMaximize: true
    // },

    icon: {
        '57': 'resources/icons/Icon.png',				    // A list of the icons used when users add the app to their home screen on iOS devices
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

    launch: function() {    // at application startup:

        // Destroy the #appLoadingIndicator element
        // Ext.fly('appLoadingIndicator').destroy();

        /***************************************************************************************
         *                                                                                     *
         *  instanciate (should be singleton obj) the salesforce connection library            *
         *                                                                                     *
         *  sf will be availble across the whole app accessing 'Kio.app.sf'                    *
         *                                                                                     *
         ***************************************************************************************/

        this.sf = new salesforce('mobile_app','sandbox');

        /***************************************************************************************
         *                                                                                     *
         *  on app start always get a new refreshed token. then go on with the app             *
         *                                                                                     *
         ***************************************************************************************/

        // cache this.sf in order to access it quickly
        var sf_cache = this.sf;

        // *************************** COMMENT FOR WINDOWS *************************************
        // get session_id using refresh_token | NOTE: the call is syncronous (see forcetk.refreshAccessToken())
        this.sf.client.refreshAccessToken(function(success_response){
            console.log('- success_token');
            // set the new token
            sf_cache.setAccessToken(success_response['access_token']);

        },function(error_response){
            // if error means error in the refresh_token OR no internet connection

            if( error_response['responseText'] && error_response['responseText'].search("cURL error 6: Couldn't resolve host") === 0 ){
                // error: No internet connectivity
                console.log('- no internet connectivity: working offline till connectivity is back');
            }else{
                // error refreshing the access_token
                console.log('- app online but error refreshing access_token');
            }
            console.log(error_response);
        });
        // *************************** COMMENT FOR WINDOWS *************************************

        /***************************************************************************************
         *                                                                                     *
         *  get data from salesforce                                                           *
         *                                                                                     *
         ***************************************************************************************/

        this.sf.getNews(function(success_response){                     // anonymous function or move down with a news_success() function
            // success => save news into local storage
            var newsModel = Ext.create('Kio.model.News');
            var n = newsModel.saveNews(JSON.parse(success_response));   // passing the PARSED list of news to be saved into local storage
                                                                        // sf is sending the same model as defined in the app
            console.log('- saved ' + n + ' news into the local storage');

        }, function(error_response){
            // token failing or no internet connection

            if( error_response['status'] === 404 ){
                // token must be refreshed
                console.log('- access_token error while getting news. access_token must be refreshed');
                // *** IMPROVE *** get new access_token
            }else{
                // no internet connectivity
                console.log('- no internet connectivity while getting news: working offline till connectivity is back');
            }

            console.log(error_response);
        });

        /***************************************************************************************
         *                                                                                     *
         *  load settings and start the app                                                    *
         *                                                                                     *
         *  first start loads:                                                                 *
         *  - terms and condition + use geolocation user screens                               *
         *  - grounds                                                                          *
         *                                                                                     *
         ***************************************************************************************/

        // Using a delayedTask, after x ms
        Ext.create('Ext.util.DelayedTask', function() {
            // Gets the config store
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

                // load grounds (just first time the app is installed - when the app is updated (see below))
                Kio.app.sf.getGrounds(function(success_response){
                    // success => save grounds into local storage
                    var grounds_model = Ext.create('Kio.model.Ground');
                    var n = grounds_model.saveGrounds(JSON.parse(success_response));
                    // console.log('got ' + success_response.length + 'grounds from sf')
                    console.log('- saved ' + n + ' grounds into the local storage');

                }, function(error_response){
                    // token failing or no internet connection
                    console.log('- error getting grounds');
                    console.log(error_response);
                });

            } else {

                /***************************************************************************************
                 *                                                                                     *
                 *  second+ app's startup                                                              *
                 *                                                                                     *
                 ***************************************************************************************/

                /***************************************************************************************
                 *                                                                                     *
                 *  load local storage(s)                                                              *
                 *                                                                                     *
                 ***************************************************************************************/

                // grounds
                var groundsStore = Ext.getStore('Ground');
                groundsStore.load();
                // old reports that will be sent when 'app back online' function will run
                var reportsStore = Ext.getStore('Report');
                reportsStore.load();

                // create and start the main view
                var mainView = Ext.create('Kio.view.Main');
                Ext.Viewport.add(mainView);
                Ext.Viewport.setActiveItem(mainView);
            }

        }).delay(0);
    },

    onUpdated: function() {

        /***************************************************************************************
         *                                                                                     *
         *  on app update reload grounds from salesforce                                       *
         *                                                                                     *
         ***************************************************************************************/

        this.sf.getGrounds(function(success_response){
            // success => save grounds into local storage
            var grounds_model = Ext.create('Kio.model.Ground');
            var n = grounds_model.saveGrounds(JSON.parse(success_response));

            // console.log('got ' + success_response.length + 'grounds from sf')
            console.log('- saved ' + n + ' grounds into the local storage');

        }, function(error_response){
            // token failing or no internet connection
            console.log('- error getting grounds');
            console.log(error_response);
        });


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

    // note that functions defined here are accessible via Kio.app.<function_name>
});
