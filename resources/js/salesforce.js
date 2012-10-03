// object definition
function salesforce(init_params){
	
	// salesforce properties

	this.init = init_params;
	
	this.login_url 	  = 'https://login.salesforce.com/';
	this.client_id    = '3MVG99qusVZJwhsmKYfJHWTxa2xhAW.C0ON_RldSy3BK77TkjMDZhxe2k4yAW5JcZ5ckltwCx.dHRpytpf3b6';
	// short term token - also called 'sessionId'
	this.access_token = "00DE0000000bz6u!AQ4AQKW6DJpv5fgMLZw3ifLmmPGyxaICU6WY9fupvzKSKdoNQxmx_z5MOd0ZNvEcSi.3OCy2D2sPYH1kpl__3xEJh0T4CW6k";
	// long term token
	this.refresh_token = "5Aep861rEpScxnNE65bbqUE3yXPFGCYsI3qF1kCPMh7uBCj.H_bJ8o8QMMWd2PDEZKCgG8n9M.Bog==";			
	this.instance_url = "https://eu2.salesforce.com";

	// only needed when using the app as a web app - not needed when the app is an hybrid app created with build.phonegap.com
	this.proxy_url    = "http://localhost:8888/Kickitout-Mobile/resources/proxy/proxy.php?mode=native";		// for testing via web app purposes
}

// methods
salesforce.prototype.getAuthenticationParameters = function(){
	return this;
};

// // funtion that loads data from the salesforce rest api
// var loadNews = function(){
// 	console.log('news');

// 	var store = Ext.getStore('News');
// 	console.log(store);
// }

// var loadGrounds = function(){
// 	console.log('news');
// }