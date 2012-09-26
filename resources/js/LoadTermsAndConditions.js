var loadTermsAndConditions = function() {
	Ext.Msg.show({
		title: 'Terms and conditions',
		message: 'By using this mobile application I agree to the Kick it Out mobile Terms and Conditions. Data changes may apply.',
		width: 300,
		buttons:  [
					{text:'View', itemId:'kio_viewTermsAndConditions_button'},
					{text:'Agree', itemId:'kio_agreeTermsAndConditions_button'}
				  ],
		fn: function(buttonId) {
			if(buttonId === 'kio_viewTermsAndConditions_button'){
				// Initialize the main view
				Ext.Viewport.add(Ext.create('Kio.view.TermsAndConditions'));
			} else {
				getLocation();
			}
		} 
	});
}