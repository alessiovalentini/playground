Ext.define('Kio.view.MakeReport', {
	extend: 'Ext.form.Panel',
	xtype: 'kio_makeReport_navigationView',

	config: {
		title: 'Report',
		styleHtmlContent: true,
		scrollable: 'vertical',
	    masked: {
	       xtype: 'loadmask',
	       message: 'A message..',
	       indicator: true
	    },

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
			// form fields - name must match the model in order to have the json object ready to be sent / saved straight away
			{
                xtype: 'selectfield',
				placeHolder: 'Where did it happen?',
				store: 'Ground',
				id: 'kio_ground_selectfield',
				name: 'groundId',
		        valueField: 'groundName',	// sf id to send in the report *** IMPROVE ***
		        displayField: 'groundName', // sf name to display to the user
				styleHtmlContent: true
			},
			{
	            xtype: 'datetimepickerfield',
	        	id: 'kio_date_datepickerfield',
	            name : 'reportDate',
				placeHolder: 'When did it happen?',
	            //value: new Date(),
				styleHtmlContent: true,
	            dateTimeFormat : 'd/m/Y H:i',
	            picker: {
	                yearFrom: new Date().getFullYear(),
	                yearTo: new Date().getFullYear() + 15,
	                minuteInterval : 1,
	                ampm : false,
	                slotOrder: ['day', 'month', 'year','hour','minute']
	         	}
	        },
			{
                xtype: 'textareafield',
                id: 'kio_description_textareafield',
                name: 'description',
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
	            id: 'kio_name_textfield',
	            name: 'name',
    			placeHolder: 'Name',
				styleHtmlContent: true
			},
			{
	            xtype: 'textfield',
	            id: 'kio_contactPhoneNumber_textfield',
	            name: 'phone',
    			placeHolder: 'Contact phone number',
				styleHtmlContent: true
			},
			{
	            xtype: 'emailfield',
	            id: 'kio_email_emailfield',
	            name: 'email',
    			placeHolder: 'Email address',
				styleHtmlContent: true
			},
			{
	            xtype: 'textfield',
	            id: 'kio_homeAddress_textfield',
	            name: 'address',
    			placeHolder: 'Home address',
				styleHtmlContent: true
			}
		]
	}
});