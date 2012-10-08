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
			settingTabBarButton: 'tabbar button[title=Setting]',
			regularGround: '#kio_regularGround_selectfield'
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
			},
			settingTabBarButton: {
				tap: 'loadSettingFormValues'
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
		
		// get form values
		var formValues = this.getMakeReportPanel().getValues();

		// groundId must be the actual id and not the label => fix this
		var groundStore = Ext.getStore('Ground');
		formValues['groundId'] = groundStore.findRecord('groundName',formValues['groundId']).data['recordId']
		
		// submit reports in bach (as an array)
		var reports_batch = new Array();
		reports_batch.push(formValues);

		console.log(formValues);

		// creating expected sf report batch object
		var sfReportBatch = {
			// the only one attribute is the reports batch array
			reportList: reports_batch
		};

		// Kio.app.sf to get the client sf object
		Kio.app.sf.client.apexrest( '/kio/v1.0/newReport', function(response){  // call to https://<instance_url>/services/apexrest/kio/v1.0/getNews
            // success in the case of a post can be either an error return message or the actual response
            
            if( response == 'Success' ){
            	// actual success response => delete the object and show success message / go to different screen
            	alert('Thanks! Your report has been submitted');
            }else{
            	// error 
            	console.log('success/else: ' + response);
            }

        }, function(response){
            // error(S)
            
            if( response['responseText'].search("cURL error 6: Couldn't resolve host") === 0 ){
            	// error: No internet connectivity (the responseText contains that string) => saving locally the report
            	console.log('No internet connectivity => saving locally the report');
            	// **** set retry global variable !?!?!?!?!

				// generating an id for the local storage runtime (using the # of millisecond from year 1970)
				formValues['recordId'] = Date.now();	
				// get store and add record
				var reportsStore = Ext.getStore('Report');
				// save the raw form not stringyfied
				reportsStore.add( formValues );
				reportsStore.sync();

				alert('Thanks! Your report will be submitted as soon as the Internet connectivity will be available');
            }else{
            	// error saving the record (for example wrong groundID)
            	console.log('Error saving the object in SF: ' + response['responseText']);
            }

        }, 'POST', JSON.stringify(sfReportBatch), null);	// post payload (must stringify the object)




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
		
	},
	loadSettingFormValues: function() {
		// Gets the config record
		var formValues = Ext.getStore('Config').getAt(0);
		this.getSettingFormPanel().setRecord(formValues);
		// Gets the regular ground
		var regularGround = this.getRegularGround();
		// Gets the value from the store and set the new place holder
        var store = Ext.getStore('Config');
        var regularGroundLocalStorageValue = store.getAt(0).get('regularGround');
        if(regularGroundLocalStorageValue != null){
			regularGround.setPlaceHolder(regularGroundLocalStorageValue);        	
        }
	}
});