Ext.define('Kio.view.MakeReport', {
	extend: 'Ext.form.Panel',
	xtype: 'kio_makeReport_navigationView',
	
	config: {
		title: 'Report',
		styleHtmlContent: true,
		scrollable: 'vertical',
			  
		items: [
			{
				xtype: 'titlebar',
				title: 'Report',
				docked: 'top',
				
				items: [
					{
						xtype: 'button',
						text: 'Submit',
						ui: 'action ',
						id: 'kio_submitReport_button',
	        			align: 'right'
					},
					{
						xtype: 'button',
						text: 'Cancel',
						ui: 'decline ',
						id: 'kio_cancelReport_button',
	        			align: 'left'
					}
				]
			},
			{
				xtype: 'panel',
				styleHtmlContent: true,
				html: [
					'<h2><b>Incident details</b></h2>'
				]								
			},
			{					
                xtype: 'selectfield',
				store: 'Ground',
				name: 'kio_ground_selectfield',
		        valueField: 'groundName',
		        displayField: 'groundName',
				styleHtmlContent: true            		
			},
			{					
                xtype: 'datepickerfield',
                name: 'kio_date_datepickerfield',
				placeHolder: 'When did it happen?',
				dateFormat: 'l d F Y g:i',
				picker:{
	               yearFrom : new Date().getFullYear(),
	               yearTo   : new Date().getFullYear() + 15,
	               slotOrder:['day', 'month', 'year'],
               },
				styleHtmlContent: true            		
			},
			{					
                xtype: 'textareafield',
                name: 'kio_description_textareafield',
				placeHolder: 'Describe what happened',
				styleHtmlContent: true            		
			},
			{
				xtype: 'panel',
				styleHtmlContent: true,
				html: [
					'<h2><b>Your details</b></h2>'
				]								
			},
			{				
	            xtype: 'textfield',
	            name: 'kio_name_textfield',
    			placeHolder: 'Name',
				styleHtmlContent: true
			},
			{				
	            xtype: 'textfield',
	            name: 'kio_contactPhoneNumber_textfield',
    			placeHolder: 'Contact phone number',
				styleHtmlContent: true
			},
			{				
	            xtype: 'emailfield',
	            name: 'kio_email_emailfield',
    			placeHolder: 'Email address',
				styleHtmlContent: true
			},
			{				
	            xtype: 'textfield',
	            name: 'kio_homeAddress_textfield',
    			placeHolder: 'Home address',
				styleHtmlContent: true
			}
		]
	}
});