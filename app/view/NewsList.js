Ext.define('Kio.view.NewsList', {
	extend: 'Ext.List',
	xtype: 'kio_newsList_list',
	
	config: {
		itemTpl: '<div style="height: 3.5em; font-size: 0.8em; ">'+ 
					'<img src="{newsImageUrl}" witdh="50em" height="50em" style="float: left; margin-right: 0.8em"/>'+
					'{title}'+
				 '</div>',
		grouped: false,
		store: 'News',
		emptyText: 'No news to display',
		loadingText: 'Loading news...',
		style: "background-color: #eeeeee"
	}
});