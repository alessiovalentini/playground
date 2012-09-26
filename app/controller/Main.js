Ext.define('Kio.controller.Main', {
	extend: 'Ext.app.Controller',
	
	config: {
		refs: {
			mainTabPanel: 'kio_main_tabPanel',
			showReportPanel : 'kio_showReport_panel'

		},
		control: {
			'kio_newsList_list': {
				select: 'showNewsDetail'
			},
			'#kio_showReport_panel': {
				tap: 'showReport'
			},
			'#kio_backHome_button': {
				tap: 'backHome'
			}
		}
	},
	
	showNewsDetail : function(list, record) {
		
		// instanciate the view
		var newsDetailView = Ext.create('Kio.view.NewsDetail');
		// pass the data to use in the template
		newsDetailView.setData(record.data);
		// add and set as an active view
		Ext.Viewport.add(newsDetailView);
		Ext.Viewport.setActiveItem(newsDetailView);
	},
	showReport : function() {
		// Getters and setter are created once you set a variable in refs
		var mainTab = this.getMainTabPanel();
		mainTab.setActiveItem(1);
	},
	backHome : function() {
		// instanciate the view
		var homeView = Ext.create('Kio.view.Main');
		// add and set as an active view
		Ext.Viewport.add(homeView);
		Ext.Viewport.setActiveItem(homeView);
	}
	
});