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
				// Set the location
				var geo = Ext.create('Ext.util.Geolocation', {
					autoUpdate: false,
					listeners: {
						locationupdate: function(geo) {
							alert('New latitude: ' + geo.getLatitude());								
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
				});
				geo.updateLocation();
			} else {								
				// Initialize the main view
				var mainView = Ext.create('Kio.view.Main');
				Ext.Viewport.add(mainView);
				Ext.Viewport.setActiveItem(mainView);
			}
	} 
	});
}
