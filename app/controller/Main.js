Ext.define('Kio.controller.Main', {
	extend: 'Ext.app.Controller',

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
			makeReportHomeButton: '#kio_home_makeAReport_button',
			declineTermsAndConditionsButton: '#kio_termsAndConditions_decline_button',
			confirmTermsAndConditionsButton: '#kio_termsAndConditions_confirm_button'
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
				// tap: 'showReport'
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
			},
			declineTermsAndConditionsButton: {
				tap: 'declineTermsAndConditions'
			},
			confirmTermsAndConditionsButton: {
				tap: 'confirmTermsAndConditions'
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


		/*******************************************************************************************************
		*                                                                                                      *
		*  populate the form values with the available values from the user Config in the local storage        *
		*                                                                                                      *
		********************************************************************************************************/

		var configStore = Ext.getStore('Config');
		var settings = configStore.getAt(0);


		/*******************************************************************************************************
		*                                                                                                      *
		*  check if the user allows the app to get the current location. If yes, the grounds                   *
		*  must be oredered by location                                                                        *
		*                                                                                                      *
		********************************************************************************************************/

		// Get the status of currentLocation
        var currentLocation = configStore.getAt(0)['_data']['currentLocation'];

        if(currentLocation === true){
            // set the new location of the user
            var geo = Ext.create('Kio.view.UpdateLocation');
            geo.updateLocation();
            // **** REORDER THE GROUNDS ***
        }

		// **** IMPROVE *** get the name of the ground having the regularGround id, in order to prepopulate the make report view with the name of the ground
		var groundStore = Ext.getStore('Ground');
		var groundRecord = groundStore.findRecord('recordId',settings['data']['regularGround']);
		var groundName;

		// check if graundRecord is undefined => this because it's not possible to get ['data'] of undefined
		if( groundRecord != null )
			groundName = groundRecord['data']['groundName'];
		else
			groundName = null;

		// set the loaded values (necessary to pass an object that maps the values)
		makeReportPanel.setValues({
			address: settings['data']['address'],
			phone: settings['data']['phone'],
			email: settings['data']['email'],
			groundId: groundName,
			name: settings['data']['name']
		});

		// finally show the new view
		makeReportPanel.show();
		Ext.Viewport.setActiveItem(makeReportPanel);

		//}
	},
	submitReport: function(){

		/*************************************************************************************************************************************
		*                                                                                    							                     *
		*	Submit the report to SF: 																										 *
		*	- save locally report 																		   									 *
		*   - get batch of reports 																											 *
		*   - try send batch to sf 																											 *
		*   	- if success => remove reports from local storage, alert success, go to home screen											 *
		*		- if error   => simply alert error, go to home screen => the reports will be submitted later on when connection will be back *                                                                                                *
		**************************************************************************************************************************************/

		// Loading mask
		var reportMask = new Ext.LoadMask(Ext.getBody(), {message:"Submitting report. Please wait..."}, {fullscreen : true});

		// cache this
		var mainController = this;

		// get form values
		var formPanel = this.getMakeReportPanel();
		var formValues = formPanel.getValues();

		// get the model to use validate function
		var configModel = Ext.create('Kio.model.Report');
		var errors = configModel.validateReport(formValues);

		if(errors != null ){
			// Show errors
			// alert(errors);
	    	// Note that the MessageBox is asynchronous. For this reason, you must use a callback function
	    	Ext.Msg.alert('Error', errors, Ext.emptyFn);

		} else {
			// showing loading mask
   			reportMask.show();

			// change date / time format to match the one we expet in SF: "12/02/2012 12:34"
			var pickedDate = formValues['reportDate'];
			formValues['reportDate'] = pickedDate.getDate() + '/' + pickedDate.getMonth() + '/' + pickedDate.getFullYear() + ' ' + pickedDate.getHours() + ':' + pickedDate.getMinutes();

			// groundId must be the actual id and not the label => fix this
			var groundStore = Ext.getStore('Ground');
			var selectedGroundRecord = groundStore.findRecord('groundName',formValues['groundId']);	// *** IMPROVE *** (we can get directly id from the form)

			// user selected a ground
			formValues['groundId'] = selectedGroundRecord.data['recordId'];	 // set the recordId (sf id) instead of the groundName *** IMPROVE *** related to above

			// save the new report into local storage

			// generating an id for the local storage runtime (using the # of millisecond from year 1970)
			formValues['recordId'] = Date.now();
			var reportsStore = Ext.getStore('Report');
			// save the raw form not stringyfied
			reportsStore.add( formValues );
			reportsStore.sync();

			// get the batched list of reports in sf webservice expected format
			var reports_model = Ext.create('Kio.model.Report');
			// get the batch of reports from the local storage, ready to be sent to salesforce
			var reports_batch = reports_model.getReportsBatch();

			// try to send the batch of reports to sf
			Kio.app.sf.newReport( reports_batch , function(success_response){
				// success => remove sent reports from local storage and alert user

				if( success_response == 'Success' ){
			    	// delete reports from local storage
			    	reportsStore.removeAll();
			    	reportsStore.sync();

					// hiding loading mask
		   			reportMask.hide();

			    	// show alert to the user
			    	// Note that the MessageBox is asynchronous. For this reason, you must use a callback function
			    	Ext.Msg.alert('Thanks!', 'Your report has been submitted', function(){
			    		// clear form
				    	formPanel.reset();

						// go back to main tab screen
						var mainPanel = mainController.getMainTabPanel()	// get main tab panel
			        	mainPanel.setActiveItem(0);		      				// set that the active item is the first (home)
			         	Ext.Viewport.setActiveItem(mainPanel);				// set the active item for the viewport => is the tab main panel with home panel selected

				    	console.log('- ' + reports_batch['reportList'].length + ' report(s) submitted successfully to salesforce');
				    	console.log(reports_batch);
			    	});

			    }else{
			    	// error =>
			    	console.log('- unmanaged error:');
			    	console.log(success_response);
			    }

			}, function(error_response){

				// Loading spinner - hide it
				// var mask = formPanel.getMasked();
	   //          mask.setIndicator(true);
	   //          mask.setHidden(true);
	   //          formPanel.setMasked(mask);

	   			// hiding loading mask
	   			reportMask.hide();

				// error submitting reports
				if( error_response['responseText'].search("cURL error 6: Couldn't resolve host") === 0 ){
			    	// error: No internet connectivity

			    	// show message to the user
			    	// alert('Thanks! Your report will be submitted as soon as the Internet connectivity will be available');
			    	// show alert to the user
			    	// Note that the MessageBox is asynchronous. For this reason, you must use a callback function
			    	Ext.Msg.alert('Thanks!', 'Your report will be submitted as soon as the Internet connectivity will be available', function(){
				    	// clear form
						formPanel.reset();

						// go back to main tab screen
						var mainPanel = mainController.getMainTabPanel()	// get main tab panel
			        	mainPanel.setActiveItem(0);		      				// set that the active item is the first (home)
			        	Ext.Viewport.setActiveItem(mainPanel);				// set the active item for the viewport => is the tab main panel with home panel selected

				    	console.log('- no internet connectivity: report saved locally');
			    	});

			    }else{
			    	// any other possible error?? wrong token?!!? *** IMPROVE ***
			    }
			});

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
    	mainPanel.setActiveItem(0);		      	// set that the active item is the first (home)
    	Ext.Viewport.setActiveItem(mainPanel);	// set the active item for the viewport => is the tab main panel with home panel selected
	},
	saveSetting: function(){
		// get form values
		var formValues = this.getSettingFormPanel().getValues();

		var configModel = Ext.create('Kio.model.Config');
		var errors = configModel.validateConfig(formValues);

		if(errors != null){
			// Show errors
			// alert(errors);
	    	// Note that the MessageBox is asynchronous. For this reason, you must use a callback function
	    	Ext.Msg.alert('Error', errors, Ext.emptyFn);
		} else {
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

			// go back to the home page
			var mainTab = this.getMainTabPanel();
			mainTab.setActiveItem(0);
		}
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
	declineTermsAndConditions: function() {
		// Show errors
		// alert(errors);
    	// Note that the MessageBox is asynchronous. For this reason, you must use a callback function
    	Ext.Msg.alert('Error', 'It is not possible to use the application without accepting the Terms and Conditions', Ext.emptyFn);
	},
	confirmTermsAndConditions: function() {
		getLocation();
	},
	// connection checker => perform actions on app online or offline
	checkConnection: function(){

		// executed just first time
		var oldStatus = false;	// app initially sleeping

		// keep checking connection status
		setInterval(function(){

			var currentStatus = Ext.device.Connection.isOnline();
			// console.log('current: ' + currentStatus + ' - old: ' + Kio.app.oldStatus);

			if(currentStatus === true && oldStatus === true){

				oldStatus = Ext.device.Connection.isOnline();	// set the old status for the next iteration
			}
			else if(currentStatus === false && oldStatus === false){

				oldStatus = Ext.device.Connection.isOnline();	// set the old status for the next iteration
			}
			else if(currentStatus === true && oldStatus === false){

				/********************************************************************************************************************
                 *
                 *  app back online
                 *
                 *	- if there are reports saved in the local storage, batch them up, send them. on success remove them from local storage
                 *	- get news ? ... maybe not necessary having the pull to refresh *** IMPROVE ***
                 *
                 ********************************************************************************************************************/

				// get report store
				var reportsStore = Ext.getStore('Report');

				if( reportsStore.getCount() > 0 ){
					// reports have been submitted when the app was offline. batch them up and send them to salesforce

					var reports_model = Ext.create('Kio.model.Report');
					// get the batch of reports from the local storage, ready to be sent to salesforce
					var reports_batch = reports_model.getReportsBatch();

					// send batch of reports to sf
					Kio.app.sf.newReport( reports_batch , function(success_response){
						// success => remove sent reports from local storage

						if( success_response == 'Success' ){
					    	console.log('- connection status: ' + reports_batch['reportList'].length + ' report(s) submitted successfully to salesforce after app back online!!!');
					    	console.log(reports_batch);
					    	// delete reports from local storage
					    	reportsStore.removeAll();
					    	reportsStore.sync();

					    }else{
					    	// error =>
					    	console.log('- connection status: ERROR (success/else branch) after app back online:');
					    	console.log(success_response);
					    }

					}, function(error_response){
						// error submitting reports

						if( error_response['responseText'].search("cURL error 6: Couldn't resolve host") === 0 ){
					    	// error: No internet connectivity (the responseText contains that string) => saving locally the report
					    	console.log('- connection status: still no internet connectivity after app back online');
					    }else{
					    	// any other possible error?? wrong token?!!? *** IMPROVE ***
					    }
					});

				}else{
					// user did not submit any report while app was offline
					console.log('- connection status: app online / user did not submit any report while app was offline');
				}

				oldStatus = Ext.device.Connection.isOnline();	// set the old status for the next iteration

			}else if(currentStatus === false && oldStatus === true){

			    /********************************************************************************************************************
                 *                                                                                     								*
                 *  app offline => show banner that alerts the user                                                              	*
                 *   																												*
                 ********************************************************************************************************************/

		    	// Note that the MessageBox is asynchronous. For this reason, you must use a callback function
		    	Ext.Msg.alert('Warning', 'connection status: app offline', Ext.emptyFn);

                console.log('- connection status: app offline');
				oldStatus = Ext.device.Connection.isOnline();	// set the old status for the next iteration
			}

		}, 2000);	// interval time

	}
});