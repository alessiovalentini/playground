Ext.define('Kio.view.News', {
	extend: 'Ext.Panel',
	xtype: 'kio_news_panel',
	
	config: {
		title: 'News',
		iconCls: 'reply',
		styleHtmlContent: true,

		html: [
			'This is going to be the news panel'
		],
			  
		items: [
			{
				xtype: 'titlebar',
				title: 'News',
				docked: 'top'
			}
		]
	}
});