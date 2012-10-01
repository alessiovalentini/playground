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
	stores: ['News', 'Ground', 'Config'],
	models: ['News', 'Ground', 'Config'],

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

		
        // Using a delayedTask, after x ms
        Ext.create('Ext.util.DelayedTask', function() {
            // Gets the config storage
            var store = Ext.getStore('Config');
            // This is the config record Id in the local storage
            var configRecordId = '1';
            // Checks if the config record is in the local storage
            // If it is not there it means this is the first time the user launches the app
            var recordIdFromLocalStorage = store.find('recordId', configRecordId);
            if(recordIdFromLocalStorage == -1){ // No config stored before in the localStorage
                // The data that is going to be sync
                var persistData = {
                    recordId: configRecordId,
                    pushNotifications: false
                }
                store.add(persistData);
                store.sync();  
                loadTermsAndConditions();              
            } else {
                // Set the location
                var geo = Ext.create('Kio.view.UpdateLocation');
                geo.updateLocation();                  
            } 
        }).delay(0);
    },

    onUpdated: function() {
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
