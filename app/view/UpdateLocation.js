Ext.define('Kio.view.UpdateLocation', {
	extend: 'Ext.util.Geolocation',
	xtype: 'kio_updateLocation_geolocation',
	
	config: {
		autoUpdate: false,
		listeners: {
			locationupdate: function(geo) {
				// Checks the local storage to see if the user activated the current location before				
	            var store = Ext.getStore('Config');
	            // Config record will be always at this position inside the local storage
	            var configRecord = store.getAt(0);
				// Sets the new location
				var latitude = geo.getLatitude();
				var longitude = geo.getLongitude();
				configRecord.set('latitude', latitude);
				configRecord.set('longitude',longitude);
				// sync the config record in the local storage
				store.sync();
				// Initialize the main view
				var mainView = Ext.create('Kio.view.Main');
				Ext.Viewport.add(mainView);
				Ext.Viewport.setActiveItem(mainView);
			},
			locationerror: function(geo, bTimeout, bPermissionDenied, bLocationUnavailable, message) {
				if(bTimeout){
					alert('Timeout occurred.');									
					// Initialize the main view
					var mainView = Ext.create('Kio.view.Main');
		            Ext.Viewport.add(mainView);
		            Ext.Viewport.setActiveItem(mainView);								
				} else {
					alert('Error occurred.');									
					// Initialize the main view
					var mainView = Ext.create('Kio.view.Main');
		            Ext.Viewport.add(mainView);
		            Ext.Viewport.setActiveItem(mainView);
				}
			}
		}  
	}
});