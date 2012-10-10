Ext.define('Kio.view.News', {
	extend: 'Ext.Panel',
	xtype: 'kio_news_panel',
	
	config: {
		title: 'News',
		iconCls: 'arrow_right',
		scrollable: true,
			  
		items: [
			{
				xtype: 'titlebar',
				title: 'News',
				docked: 'top'
			},
			{
				xtype: 'kio_newsList_list',
				scrollable: false,
				grouped: true
				// removed height; do not remove scrollable:false (or change it to true) otherwise it needs height (otherwise it doesn't show any item)
			}
		]
	}
});