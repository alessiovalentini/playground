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
					'provide you with tailored news about our work and make it easier for you to report incidents of discrimination</p>'
				]
			},
			{				
	            xtype: 'textfield',
	            name: 'homeGround',
    			placeHolder: 'Regular home ground?',
				styleHtmlContent: true
			},
			{				
	            xtype: 'panel',
				styleHtmlContent: true,
				html: [
					'<p><span style="font-size: 1.5em"><b>Your regular home ground</b></span><br/>Let us know your home ground and we can provide you with tailored news about our work '+
					'and make it easier for you to report incidents of discrimination</p>'
				]
			},
			{				
	            xtype: 'textfield',
	            name: 'name',
    			placeHolder: 'Name',
				styleHtmlContent: true
			},
			{				
	            xtype: 'textfield',
	            name: 'contactPhoneNumber',
    			placeHolder: 'Contact phone number',
				styleHtmlContent: true
			},
			{				
	            xtype: 'emailfield',
	            name: 'email',
    			placeHolder: 'Email address',
				styleHtmlContent: true
			},
			{				
	            xtype: 'emailfield',
	            name: 'homeAddress',
    			placeHolder: 'Home address',
				styleHtmlContent: true
			},
			{				
	            xtype: 'panel',
				styleHtmlContent: true,
				html: [
					'<p><span style="font-size: 1.5em"><b>Your regular home ground</b></span><br/>Let us know your home ground and we can '+
					'provide you with tailored news about our work and make it easier for you to report incidents of discrimination</p>'
				]
			},
			{				
	            xtype: 'togglefield',
	            name: 'pushNotifications',
	            label: 'Push notifications',
	            ui: 'radio',
				styleHtmlContent: true
			},
			{				
	            xtype: 'panel',
				styleHtmlContent: true,
				html: [
					'<p><span style="font-size: 1.5em"><b>Your regular home ground</b></span><br/>Let us know your home ground and we can '+
					'provide you with tailored news about our work and make it easier for you to report incidents of discrimination</p>'
				]
			},
			{				
	            xtype: 'togglefield',
	            name: 'currentLocation',
	            label: 'Current location',
	            ui: 'radio',
				styleHtmlContent: true
			}
		]
	}
});