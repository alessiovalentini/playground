Ext.define('Kio.view.News', {
	extend: 'Ext.Panel',
	xtype: 'kio_news_panel',
	
	config: {
		title: 'News',
		iconCls: 'arrow_right',
			  
		items: [
			{
				xtype: 'titlebar',
				title: 'News',
				docked: 'top'
			},
			{
				xtype: 'kio_newsList_list',
				scrollable: true,
				grouped: true,
				height: '50em'
			}
		]
	}
});