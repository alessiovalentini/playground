Ext.define('Kio.view.Setting', {
	extend: 'Ext.Panel',
	xtype: 'kio_setting_panel',
	
	config: {
		title: 'Setting',
		iconCls: 'settings',
		styleHtmlContent: true,

		html: [
			'This is the setting page'
		],
			  
		items: [
			{
				xtype: 'titlebar',
				title: 'Setting',
				docked: 'top'
			}
		]
	}
});