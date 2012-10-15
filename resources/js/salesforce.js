/******************************************************************************************************** 
*                                                                                                      *
*  object definition and initialization                                                                *
*                                                                                                      *
********************************************************************************************************/

function salesforce(app_type, env){
	
	if( env === 'sandbox' ){

		// salesforce properties sandbox

		this.app_type = app_type;
		
		this.login_url 	   = "https://test.salesforce.com/";
		this.client_id     = "3MVG9_7ddP9KqTzcZNlY7gQI32_QXYcMkcIZOUADvVpqWhqWPV5OtLNfryrd55BwDXlH4AKELATImxKiO9gN9";
		// short term token (also known in sf as SESSION ID) that allow to perform the request (dependind on sf options) - also called 'sessionId'		
		// this token last the time set up in sf under timeout options
		// if no one is calling the api for that amount of time the token must be refreshed using the refresh_token
		// in this implementation the token is getted every time at the startup of the app using the refresh token and saved in memory
		this.access_token  = "00DJ00000007aDx!AQIAQICYDS16Vd6lpw5lpN..ISxRmQbFKYlC10GVT9aXWGCh_BHcQi37_m7Kc3ArhJQZdu6S3T8Ob1WY9inkqAuyvZ0m5XxN";
		// long term token
		this.refresh_token = "5Aep861H8tnG68exDFPLJiMbW7gyzDIvQ1zY7LtUCh9ys4lGgxc7gNby2x5nEnzcvamhnkv3MDHvw==";
		this.instance_url  = "https://cs10.salesforce.com";

		// only needed when using the app as a web app - not needed when the app is an hybrid app created with build.phonegap.com
		this.proxy_url     = "http://localhost:8888/Kickitout-Mobile/resources/proxy/proxy.php?mode=native";

		// initialization - get a force tk client and set it up accordingly to the app type
		this.client 	   = this.getClient( app_type );

	}else if( env === 'production' ){

		// salesforce properties production

		this.app_type = app_type;
		
		this.login_url 	   = 'https://login.salesforce.com/';
		this.client_id     = '3MVG99qusVZJwhsmKYfJHWTxa2xhAW.C0ON_RldSy3BK77TkjMDZhxe2k4yAW5JcZ5ckltwCx.dHRpytpf3b6';
		// short term token (also known in sf as SESSION ID) that allow to perform the request (dependind on sf options) - also called 'sessionId'		
		// this token last the time set up in sf under timeout options
		// if no one is calling the api for that amount of time the token must be refreshed using the refresh_token
		// in this implementation the token is getted every time at the startup of the app using the refresh token and saved in memory
		this.access_token  = "00DJ00000007aDx!AQIAQMxgbpfK0y.Ci.86TM48I2nV5ltKF8H1.SSMf7LXlip1pZSIx6jqlHfwrI2jiXJtNqNJgjf1tEUcmowfOkIoU9v.QdQ9";
		// long term token
		this.refresh_token = "5Aep861rSrJOsYD8snSP51Uw1W8G75ZRCxISj6S5dOQX86ZmVSlXWKKQUJ09Tlf1rnjpKUe_q41SQ==";
		this.instance_url  = "https://eu2.salesforce.com";

		// only needed when using the app as a web app - not needed when the app is an hybrid app created with build.phonegap.com
		this.proxy_url     = "http://localhost:8888/Kickitout-Mobile/resources/proxy/proxy.php?mode=native";

		// initialization - get a force tk client and set it up accordingly to the app type
		this.client 	   = this.getClient( app_type );
	} 	
}

/******************************************************************************************************** 
*                                                                                                      *
*  object methods 						                                                               *
*                                                                                                      *
********************************************************************************************************/

/**
 * return a new forcetk client object set up with salesforce connection parameters chosen by the user
 */

salesforce.prototype.getClient = function(app_type){

	if( this.client === undefined ){
		
		// instanciate a new forcetk client
		if( app_type === 'web_app' ){
			// a web app needs to use a proxy.php
			this.client = new forcetk.Client(this.client_id, this.login_url, this.proxy_url);
		}
		else if( app_type === 'mobile_app' ){
			// a mobile app doesn't need to use a proxy.php
			this.client = new forcetk.Client(this.client_id, this.login_url);
		}
		
		// set client tokenS (short and long term) and instance_url
		this.client.setSessionToken(this.access_token, null, this.instance_url);
        this.client.setRefreshToken(this.refresh_token);  
	}
	return this.client;
};

salesforce.prototype.setAccessToken = function(access_token){
	this.access_token = access_token;
	this.client.sessionId = access_token;
}

salesforce.prototype.getAuthenticationParameters = function(){

	return {

		client_id : this.client_id,	
		access_token : this.access_token,
		refresh_token : this.refresh_token,
		instance_url : this.instance_url

	};
};

/**
 * abstraction wrapper for our custom webservice action 'getNews' 
 *
 * callout to https://<instance_url>/services/apexrest/kio/v1.0/getNews
 *
 */

salesforce.prototype.getNews = function(callback, error){

	this.client.apexrest( '/kio/v1.0/getNews', callback, error, 'GET', null, null);
};

/**
 * abstraction wrapper for our custom webservice action 'getGrounds' 
 *
 * callout to https://<instance_url>/services/apexrest/kio/v1.0/getGrounds
 *
 */

salesforce.prototype.getGrounds = function(callback, error){

	this.client.apexrest( '/kio/v1.0/getGrounds', callback, error, 'GET', null, null);
};

/**
 * abstraction wrapper for our custom webservice action 'newReport' 
 *
 * callout to https://<instance_url>/services/apexrest/kio/v1.0/newReport
 *
 * @param report_batch: the NOT STRINGIFIED Array (batch) of reports to send to the SF webservice
 *
 */

salesforce.prototype.newReport = function(reports_batch, callback, error){

	this.client.apexrest( '/kio/v1.0/newReport', callback, error, 'POST', JSON.stringify(reports_batch), null);
};