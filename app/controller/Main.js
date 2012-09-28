Ext.define('Kio.controller.Main', {
	extend: 'Ext.app.Controller',
	
	config: {
		refs: {
			mainTabPanel: 'kio_main_tabPanel',
			showReportPanel : 'kio_showReport_panel',
			newsDetailPanel: 'kio_newsDetail_panel',
			newsListPanel: 'kio_newsList_list',
			makeReportButton: '#kio_makeReport_button',
			makeReportPanel: 'kio_makeReport_navigationView',
			submitReportButton: '#kio_submitReport_button',
			cancelReportButton: '#kio_cancelReport_button',
			cancelSettingButton: '#kio_cancelSetting_button',
			saveSettingButton:'#kio_saveSetting_button',
			backHomeButton: '#kio_backHome_button',
			showReportButton: '#kio_showReport_panel',
			settingFormPanel: 'kio_setting_panel',
			// newsTabBarButton: 'tabbar button[title=News]'
		},
		control: {
			newsListPanel: {
				select: 'showNewsDetail'
			},
			showReportButton: {
				tap: 'showReport'
			},
			backHomeButton: {
				tap: 'backHomeFromAnotherPanel'
			},
			newsTabBarButton: {
				tap: 'showNews'
			},
			cancelSettingButton: {
				tap: 'backHomeFromTheSameTabPanel'
			},
			makeReportButton: {
				tap: 'showMakeReport'
			},
			cancelReportButton: {
				tap: 'backHomeFromAnotherPanel'
			},
			submitReportButton: {
				tap: 'submitReport'
			},
			saveSettingButton: {
				tap: 'saveSetting'	
			}
		}
	},
	
	showNewsDetail: function(list, record){
		// If it was created before, just show the panel otherwise it creates it
		var newsDetailPanel = this.getNewsDetailPanel();
		if(newsDetailPanel === undefined){
			// instanciate the view
			newsDetailPanel = Ext.create('Kio.view.NewsDetail');
			// add and set as an active view
			Ext.Viewport.add(newsDetailPanel);
		}
		// pass the data to use in the template
		newsDetailPanel.setData(record.data);
		// Show the new view
		newsDetailPanel.show();
		Ext.Viewport.setActiveItem(newsDetailPanel);
	},
	showReport: function(){
		// Getters and setter are created once you set a variable in refs
		var mainTab = this.getMainTabPanel();
		mainTab.setActiveItem(1);
	},
	showMakeReport: function(){
		// If it was created before, just show the panel otherwise it creates it
		var makeReportPanel = this.getMakeReportPanel();
		if(makeReportPanel === undefined){
			// instanciate the view
			makeReportPanel = Ext.create('Kio.view.MakeReport');
			// add and set as an active view
			Ext.Viewport.add(makeReportPanel);
		}
		// Show the new view
		makeReportPanel.show();
		Ext.Viewport.setActiveItem(makeReportPanel);
	},
	submitReport: function(){
		// Submit the report
		console.log('submit the report');

	},
	backHomeFromTheSameTabPanel: function(){
		// Getters and setter are created once you set a variable in refs
		var mainTab = this.getMainTabPanel();
		mainTab.setActiveItem(0);		
	},
	backHomeFromAnotherPanel: function(){
		// If it was created before, just show the panel otherwise it creates it
		var mainTab = this.getMainTabPanel();
		if(mainTab === undefined){
			// instanciate the view
			mainTab = Ext.create('Kio.view.Main');
			// add and set as an active view
			Ext.Viewport.add(mainTab);
		}
		// Deselect items from the news list
		var newsListPanel = this.getNewsListPanel();
		if(newsListPanel != undefined){
			newsListPanel.deselectAll();
		}
		Ext.Viewport.setActiveItem(mainTab);
	},
	saveSetting: function(){
		// Gets the values from the form and save them in a local store
		var settingFormPanel = this.getSettingFormPanel();
		var values = settingFormPanel.getValues();
		var ground = values['kio_ground_selectfield'];
		var name = values['kio_name_textfield'];
		var phoneNumber = values['kio_contactPhoneNumber_textfield'];
		var email = values['kio_email_emailfield'];
		var address = values['kio_homeAddress_textfield'];
		var pushNotifications = values['kio_pushNotifications_togglefield'];
		var currentLocation = values['kio_currentLocation_togglefield'];
	}
});