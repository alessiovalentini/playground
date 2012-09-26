Ext.define('Kio.view.Report', {
	extend: 'Ext.Panel',
	xtype: 'kio_report_panel',
	
	config: {
		title: 'Report',
		iconCls: 'compose',
		styleHtmlContent: true,

		html: [
            "This is going to be the product page."
        ],
			  
		items: [
			{
				xtype: 'titlebar',
				title: 'Report',
				docked: 'top'
			},
		]
	}
});