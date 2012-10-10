Ext.define('Kio.controller.Main', {
	extend: 'Ext.app.Controller',
	
	// connection checker (under sdk/src/ux/util)
	requires: [
        'Ext.ux.util.OnlineManager'
    ],
    // connection checker

	config: {
		refs: {
			mainTabPanel: 'kio_main_tabPanel',				// the connection manager is attached to the main panel
			// showReportPanel : 'kio_showReport_panel',	// not used anymore. now using big make report button
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
			regularGround: '#kio_regularGround_selectfield',
			makeReportHomeButton: '#kio_home_makeAReport_button'			
		},
		control: {
			// connection checker
			mainTabPanel: {
				// the connection manager is attached at the initialization of the main panel
				initialize: 'checkConnection'     
			},
			// connection checker

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
			makeReportHomeButton:{
				tap: 'showReport'	
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
		// populate the form values with the available values from the user Config in the local storage
		var configStore = Ext.getStore('Config');
		var settings = configStore.getAt(0);

		// **** IMPROVE *** get the name of the ground having the regularGround id, in order to prepopulate the make report view with the name of the ground
		var groundStore = Ext.getStore('Ground');
		var groundRecord = groundStore.findRecord('recordId',settings['data']['regularGround']);
		var groundName;

		// check if a 
		if( groundRecord != null )
			groundName = groundRecord['data']['groundName'];	// not possible to get ['data'] of undefined
		else
			groundName = null;

		makeReportPanel.setValues({
			address: settings['data']['address'],
			phone: settings['data']['phone'],
			email: settings['data']['email'],
			groundId: groundName,
			name: settings['data']['name']
		});

		// Show the new view
		makeReportPanel.show();
		Ext.Viewport.setActiveItem(makeReportPanel);
	},
	submitReport: function(){
		// Submit the report to SF

		// cache this
		var mainController = this;
		
		// get form values
		var formValues = this.getMakeReportPanel().getValues();

		// change date / time format to match the one we expet in SF: "12/02/2012 12:34"
		var pickedDate = formValues['reportDate'];
		formValues['reportDate'] = pickedDate.getDate() + '/' + pickedDate.getMonth() + '/' + pickedDate.getFullYear() + ' ' + pickedDate.getHours() + ':' + pickedDate.getMinutes();

		// groundId must be the actual id and not the label => fix this
		var groundStore = Ext.getStore('Ground');
		var selectedGroundRecord = groundStore.findRecord('groundName',formValues['groundId']);	// *** IMPROVE *** (we can get directly id from the form)
		
		if( selectedGroundRecord != null ){
			// user selected a ground 

			formValues['groundId'] = selectedGroundRecord.data['recordId'];

			// submit reports in bach (as an array)
			var reports_batch = new Array();
			reports_batch.push(formValues);

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
	            	console.log('Report submitted successfully: ');
	            	console.log(formValues);
	            	// go to the home screen	      
					var mainPanel = mainController.getMainTabPanel()	// get main tab panel
	            	mainPanel.setActiveItem(0);		      				// set that the active item is the first (home)
	            	Ext.Viewport.setActiveItem(mainPanel);				// set the active item for the viewport => is the tab main panel with home panel selected

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
					// go to the home screen
					var mainPanel = mainController.getMainTabPanel()	// get main tab panel
	            	mainPanel.setActiveItem(0);		      				// set that the active item is the first (home)
	            	Ext.Viewport.setActiveItem(mainPanel);				// set the active item for the viewport => is the tab main panel with home panel selected

	            }else{
	            	// error saving the record (for example wrong groundID)
	            	console.log('Error saving the object in SF: ' + response['responseText']);
	            }

	        }, 'POST', JSON.stringify(sfReportBatch), null);	// post payload (must stringify the object)
		
		}else{
			// user must select a ground
			alert('A ground is necessary in order to submit a report');
		}
	},
	backHomeFromTheSameTabPanel: function(){
		// Getters and setter are created once you set a variable in refs
		
		// NB staying on the same tabPanel is not necessary to the activeItem in the viewport but just the activeItem for the tabPanel
		var mainTab = this.getMainTabPanel();
		mainTab.setActiveItem(0);		
	},
	backHomeFromAnotherPanel: function(){
		
		// Deselect items from the news list
    	var newsListPanel = this.getNewsListPanel();
		if(newsListPanel != undefined){
			newsListPanel.deselectAll();
		}

		var mainPanel = this.getMainTabPanel()	// get main tab panel
    	mainPanel.setActiveItem(0);		      				// set that the active item is the first (home)
    	Ext.Viewport.setActiveItem(mainPanel);				// set the active item for the viewport => is the tab main panel with home panel selected

		// If it was created before, just show the panel otherwise it creates it
		// var mainTab = this.getMainTabPanel();
		// if(mainTab === undefined){
		// 	// instanciate the view
		// 	mainTab = Ext.create('Kio.view.Main');
		// 	// add and set as an active view
		// 	Ext.Viewport.add(mainTab);
		// }
		// // Deselect items from the news list
		// var newsListPanel = this.getNewsListPanel();
		// if(newsListPanel != undefined){
		// 	newsListPanel.deselectAll();
		// }
		// Ext.Viewport.setActiveItem(mainTab);
	},
	saveSetting: function(){
		// get form values
		var formValues = this.getSettingFormPanel().getValues();

		// load config load storage
		var configStore = Ext.getStore('Config');
		var configValues = configStore.getAt(0);
	
		// save in the config local storage the form values
		configValues.set('address',formValues['address']);
		configValues.set('email',formValues['email']);
		configValues.set('name',formValues['name']);
		configValues.set('phone',formValues['phone']);
		// for is saving chackbox as 1 or 0 and not boolean like our model does
		if( formValues['currentLocation'] === 1 )
			configValues.set('currentLocation',true);
		else
			configValues['data']['currentLocation'] = false;
		if( formValues['pushNotifications'] === 1 )
			configValues.set('pushNotifications',true);
		else
			configValues.set('pushNotifications',false);
		// saving the regular ground measn saving directly the name so the report form will be prepopulated with the name
		configValues.set('regularGround',formValues['regularGround']);
		// update the record
		configStore.sync();

		// when the user starts a report the relative fields must be already populated

		// go back to the home page
		var mainTab = this.getMainTabPanel();
		mainTab.setActiveItem(0);
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
	},

	// connection checker => perform actions on app online or offline
	checkConnection: function(){

		OnlineManager.setUrl('resources/online/online.php');  

        OnlineManager.on({
            'onlinechange': function(mode) {
                
                if (mode) {
                    // app back online => - check if there are reports in the local storage that must be sent
                    //					  - if there are reports, send them in a batch and on post success remove them
                    //					  - get news ? ... maybe not necessary having the pull to refresh

                    // get report store
                    var reportsStore = Ext.getStore('Report');

                    //console.log(reportsStore.getCount());  NOT WORKING!!!!!!!!                    
                    
                    // iterate through the records and create the batch array
                    // note: at the end the actual records are in the offlineReports_batch[i]['data']
                    var offlineReports_batch = [];
					reportsStore.each(function(report) {
					   	offlineReports_batch.push(report['data']);
					});

					console.log(offlineReports_batch);
					console.log(offlineReports_batch.length);

					// if store has reports try to send them
					if( offlineReports_batch.length > 0 ){

						// before the report(s) where saved in the raw form object format, not batched and not stringyfied
						// ex. reportsStore.add( formValues );

						// creating expected sf report batch object
						var sfReportBatch = {
							// the only one attribute is the reports batch array
							reportList: offlineReports_batch
						};

						console.log(JSON.stringify(sfReportBatch));

						// make the call and send the records
						// Kio.app.sf to get the client sf object
						Kio.app.sf.client.apexrest( '/kio/v1.0/newReport', function(response){  // call to https://<instance_url>/services/apexrest/kio/v1.0/getNews
				            // success in the case of a post can be either an error return message or the actual response
				            
				            if( response == 'Success' ){
				            	console.log('Report submitted successfully after the app is back online!');
				            	// delete reports from local storage
				            	reportsStore.removeAll();
				            	reportsStore.sync();

				            }else{
				            	// error =>
				            	console.log('ERROR (success/else branch) after the app is back online:');
				            	console.log(response);
				            }

				        }, function(response){
				            // error
				            
				            if( response['responseText'].search("cURL error 6: Couldn't resolve host") === 0 ){
				            	// error: No internet connectivity (the responseText contains that string) => saving locally the report
				            	console.log('Still no internet connectivity after the app is back online');
				            }else{
				            	// any other possible error?
				            }

				        }, 'POST', JSON.stringify(sfReportBatch), null);	// post payload (must stringify the object)

	                    console.log('App back online');
                	}else{
                		console.log('app is back online but thre are not reports to send');
                	}
                } else {
                    // app offline => show banner that alerts the user


                    console.log('App offline');
                }
            }
        });

        OnlineManager.start();
	}
});