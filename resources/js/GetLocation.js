var getLocation = function() {
	Ext.Msg.show({
		title: 'Location',
		message: 'Kick it Out would like to use your current location.',
		width: 300,
		buttons:  [
					{text:'Don\'t allow', itemId:'kio_dontAllowLocation_button'},
					{text:'Ok', itemId:'kio_okLocation_button'}
				  ],
		fn: function(buttonId) {
			if(buttonId === 'kio_okLocation_button'){
				// Checks the local storage to see if the user activated the current location before				
	            var store = Ext.getStore('Config');
	            // Config record will be always at this position inside the local storage
	            var configRecord = store.getAt(0);
	            configRecord.set('currentLocation', true);
				// sync the config record in the local storage
				store.sync();
				// Set the location
				var geo = Ext.create('Kio.view.UpdateLocation');
				geo.updateLocation();
			}
	} 
	});
}
