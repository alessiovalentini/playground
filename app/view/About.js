Ext.define('Kio.view.About', {
	extend: 'Ext.Panel',
	xtype: 'kio_about_panel',
	
	config: {
		title: 'About us',
		iconCls: 'add',
		styleHtmlContent: true,
		
		html: [
				'This is the panel for the about us menu'
			  ],
			  
		items: [
			{
				xtype: 'titlebar',
				title: 'About',
				docked: 'top'
			}
		]
	}
});