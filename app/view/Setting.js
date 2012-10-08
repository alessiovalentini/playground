Ext.define('Kio.view.Setting', {
	extend: 'Ext.form.Panel',
	xtype: 'kio_setting_panel',
	
	config: {
		title: 'Setting',
		iconCls: 'settings',
		styleHtmlContent: true,

			  
		items: [
			{
				xtype: 'titlebar',
				title: 'Setting',
				docked: 'top',
				
				items: [
					{
						xtype: 'button',
						text: 'Cancel',
						ui: 'action',
						id: 'kio_cancelSetting_button',
	        			align: 'left'
        			},
        			{
						xtype: 'button',
						text: 'Save',
						ui: 'action',
						id: 'kio_saveSetting_button',
	        			align: 'right'
        			}
        		]
			},
			{				
	            xtype: 'panel',
				styleHtmlContent: true,
				html: [
					'<p><span style="font-size: 1.5em"><b>Your regular home ground</b></span><br/>Let us know your home ground and we can '+
					'provide you with tailored news about our work and make it easier for you to report incidents of discrimination.</p>'
				]
			},
			{					
                xtype: 'selectfield',
				placeHolder: 'Regular home ground?',
				id: 'kio_regularGround_selectfield',
				name: 'regularGround',
				store: 'Ground',
		        valueField: 'groundName',
		        displayField: 'groundName',
				styleHtmlContent: true
			},
			{				
	            xtype: 'panel',
				styleHtmlContent: true,
				html: [
					'<p><span style="font-size: 1.5em"><b>Your details</b></span><br/>Provide us with your details and we can make it '+
					'for you to report incidents of discrimination.</p>'
				]
			},
			{				
	            xtype: 'textfield',
	            id: 'kio_settingPanel_name_textfield',
	            name: 'name',
    			placeHolder: 'Name',
				styleHtmlContent: true
			},
			{				
	            xtype: 'textfield',
	            id: 'kio_settingPanel_contactPhoneNumber_textfield',
	            name: 'phone',
    			placeHolder: 'Contact phone number',
				styleHtmlContent: true
			},
			{				
	            xtype: 'emailfield',
	            id: 'kio_settingPanel_email_emailfield',
	            name: 'email',
    			placeHolder: 'Email address',
				styleHtmlContent: true
			},
			{				
	            xtype: 'textfield',
	            id: 'kio_settingPanel_homeAddress_textfield',
	            name: 'address',
    			placeHolder: 'Home address',
				styleHtmlContent: true
			},
			{				
	            xtype: 'panel',
				styleHtmlContent: true,
				html: [
					'<p><span style="font-size: 1.5em"><b>Push notifications</b></span><br/>We would like to send you Push Notifications '+
					'which may include alerts, news, sounds and icon badges.</p>'
				]
			},
			{				
	            xtype: 'togglefield',
	            id: 'kio_pushNotifications_togglefield',
	            name: 'pushNotifications',
	            label: 'Push Notifications',
	            labelWidth: '75%',
				styleHtmlContent: true
			},
			{				
	            xtype: 'panel',
				styleHtmlContent: true,
				html: [
					'<p><span style="font-size: 1.5em"><b>Current location</b></span><br/>We would like to use your current location '+
					'to help us offer you the most relevant choices and options.</p>'
				]
			},
			{				
	            xtype: 'togglefield',
	            id: 'kio_currentLocation_togglefield',
	            name: 'currentLocation',
	            label: 'Use Current Location',
	            labelWidth: '75%',
				styleHtmlContent: true
			}
		]
	}
});