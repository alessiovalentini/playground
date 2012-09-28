// Im not sure if the form uses names as id, if so, use the proper naming standard we are using kio_name_type
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
		        valueField: 'groundName',
		        displayField: 'groundName',
				styleHtmlContent: true            		
			},
			{					
                xtype: 'datepickerfield',
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
	            xtype: 'textfield',
	            name: 'homeAddress',
    			placeHolder: 'Home address',
				styleHtmlContent: true
			}
		]
	}
});