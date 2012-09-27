Ext.define('Kio.view.Report', {
	extend: 'Ext.Panel',
	xtype: 'kio_report_panel',
	
	config: {
		title: 'Report',
		iconCls: 'compose',
		styleHtmlContent: true,
		scrollable: 'vertical',

		html: [
            '<h3><b>Report an incident of discrimination</b></h3>'+
            	'<p>By reporting an incident of discrimination you will be helping '+
            	'us to kick racism and sexism out of football</p>'+
            	'<p><img src="./resources/images/kio-logo.jpg" width="100%"></p>'+
            	'<h5><b>How will making a report help Kick It Out eliminate discrimination?</b></h5>'+
            	'<ul>'+
					'<li>Reason one is bla bla bla</li>'+
					'<li>Reason two is bla bla blabla bla blabla bla bla</li>'+
					'<li>Reason three is bla bla blabla bla bla</li>'+
				'</ul>'+
            	'<h5><b>What will happen to my report?</b></h5>'+
            	'<p>This is what Kick It Out will do and they have to specify</p>'
        ],
			  
		items: [
			{
				xtype: 'titlebar',
				title: 'Report',
				docked: 'top',
				
				items: {
					xtype: 'button',
					text: 'New',
					ui: 'forward ',
					id: 'kio_makeReport_button',
        			align: 'right'
				}
			},
		]
	}
});