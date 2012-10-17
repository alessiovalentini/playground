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
				console.log('latitude: '+latitude);
				console.log('longitude: '+longitude);
			},
			locationerror: function(geo, bTimeout, bPermissionDenied, bLocationUnavailable, message) {
				if(bTimeout){
					// alert('Timeout occurred.');
			    	// Note that the MessageBox is asynchronous. For this reason, you must use a callback function
			    	Ext.Msg.alert('Error', 'Timeout occurred. It wasn\'t possible to update your location.', Ext.emptyFn);
				} else {
					// alert('Error occurred.');					
			    	// Note that the MessageBox is asynchronous. For this reason, you must use a callback function
			    	Ext.Msg.alert('Error', 'Error occurred. It wasn\'t possible to update your location.', Ext.emptyFn);
				}
			}
		}  
	}
});