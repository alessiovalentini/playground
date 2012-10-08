Ext.define('Kio.store.News', {
	extend: 'Ext.data.Store',
	
	config: {
		model: 'Kio.model.News',
		sorters: 'type',
		grouper: function(record){
			return record.get('type');
		},

		autoLoad:true,
        
        proxy:{
            type:'localstorage',
            id:'kio_news_localStorage'
        }

	// 	data: [
	// 		{ 
	// 			title: 'The Justin Campaign represented at Brighton Pride', 
	// 			date: '26 September 2012',
	// 			body: 'Salesforce.com Inc. is a global enterprise software company headquartered in San Francisco, California, '+
	// 				'United States. Best known for its customer relationship management (CRM) product, through acquisitions '+
	// 				'Salesforce has expanded into the "social enterprise arena." It was ranked number 27 in Fortune\'s 100 Best '+
	// 				'Companies to Work For in 2012. <br/><br/> It is listed on the New York Stock Exchange and is a constituent of the '+
	// 				'S&P 500 index.'+
	// 				'United States. Best known for its customer relationship management (CRM) product, through acquisitions '+
	// 				'Salesforce has expanded into the "social enterprise arena." It was ranked number 27 in Fortune\'s 100 Best '+
	// 				'Companies to Work For in 2012. <br/><br/> It is listed on the New York Stock Exchange and is a constituent of the '+
	// 				'S&P 500 index.'+
	// 				'Salesforce.com Inc. is a global enterprise software company headquartered in San Francisco, California, '+
	// 				'United States. Best known for its customer relationship management (CRM) product, through acquisitions '+
	// 				'Salesforce has expanded into the "social enterprise arena." It was ranked number 27 in Fortune\'s 100 Best '+
	// 				'Companies to Work For in 2012. <br/><br/> It is listed on the New York Stock Exchange and is a constituent of the '+
	// 				'S&P 500 index.'+
	// 				'United States. Best known for its customer relationship management (CRM) product, through acquisitions '+
	// 				'Salesforce has expanded into the "social enterprise arena." It was ranked number 27 in Fortune\'s 100 Best '+
	// 				'Companies to Work For in 2012. <br/><br/> It is listed on the New York Stock Exchange and is a constituent of the '+
	// 				'S&P 500 index.', 
	// 			newsImageUrl: 'http://www.uneecc.org/userfiles/madrid.jpg',
	// 			type: 'Latest'
	// 		},
	// 		{ 
	// 			title: 'Inaugural CAFE conference to take place at Wembley Stadium', 
	// 			date: '15 August 2012',
	// 			body: 'Salesforce.com Inc. is a global enterprise software company headquartered in San Francisco, California, '+
	// 				'United States. Best known for its customer relationship management (CRM) product, through acquisitions '+
	// 				'Salesforce has expanded into the "social enterprise arena." It was ranked number 27 in Fortune\'s 100 Best '+
	// 				'Companies to Work For in 2012. <br/><br/> It is listed on the New York Stock Exchange and is a constituent of the '+
	// 				'S&P 500 index.'+
	// 				'United States. Best known for its customer relationship management (CRM) product, through acquisitions '+
	// 				'Salesforce has expanded into the "social enterprise arena." It was ranked number 27 in Fortune\'s 100 Best '+
	// 				'Companies to Work For in 2012. <br/><br/> It is listed on the New York Stock Exchange and is a constituent of the '+
	// 				'S&P 500 index.', 
	// 			newsImageUrl: 'http://www.uneecc.org/userfiles/madrid.jpg',
	// 			type: 'Latest'
	// 		},
	// 		{ 
	// 			title: 'National Museums Liverpool to commemorate lives lost through slavery',
	// 			date: '01 January 2012',
	// 			body: 'Salesforce.com Inc. is a global enterprise software company headquartered in San Francisco, California, '+
	// 				'United States. Best known for its customer relationship management (CRM) product, through acquisitions '+
	// 				'Salesforce has expanded into the "social enterprise arena." It was ranked number 27 in Fortune\'s 100 Best '+
	// 				'Companies to Work For in 2012. <br/><br/> It is listed on the New York Stock Exchange and is a constituent of the '+
	// 				'S&P 500 index.'+
	// 				'United States. Best known for its customer relationship management (CRM) product, through acquisitions '+
	// 				'Salesforce has expanded into the "social enterprise arena." It was ranked number 27 in Fortune\'s 100 Best '+
	// 				'Companies to Work For in 2012. <br/><br/> It is listed on the New York Stock Exchange and is a constituent of the '+
	// 				'S&P 500 index.'+
	// 				'Salesforce.com Inc. is a global enterprise software company headquartered in San Francisco, California, '+
	// 				'United States. Best known for its customer relationship management (CRM) product, through acquisitions '+
	// 				'Salesforce has expanded into the "social enterprise arena." It was ranked number 27 in Fortune\'s 100 Best '+
	// 				'Companies to Work For in 2012. <br/><br/> It is listed on the New York Stock Exchange and is a constituent of the '+
	// 				'S&P 500 index.'+
	// 				'United States. Best known for its customer relationship management (CRM) product, through acquisitions '+
	// 				'Salesforce has expanded into the "social enterprise arena." It was ranked number 27 in Fortune\'s 100 Best '+
	// 				'Companies to Work For in 2012. <br/><br/> It is listed on the New York Stock Exchange and is a constituent of the '+
	// 				'S&P 500 index.'+
	// 				'Salesforce.com Inc. is a global enterprise software company headquartered in San Francisco, California, '+
	// 				'United States. Best known for its customer relationship management (CRM) product, through acquisitions '+
	// 				'Salesforce has expanded into the "social enterprise arena." It was ranked number 27 in Fortune\'s 100 Best '+
	// 				'Companies to Work For in 2012. <br/><br/> It is listed on the New York Stock Exchange and is a constituent of the '+
	// 				'S&P 500 index.'+
	// 				'United States. Best known for its customer relationship management (CRM) product, through acquisitions '+
	// 				'Salesforce has expanded into the "social enterprise arena." It was ranked number 27 in Fortune\'s 100 Best '+
	// 				'Companies to Work For in 2012. <br/><br/> It is listed on the New York Stock Exchange and is a constituent of the '+
	// 				'S&P 500 index.'+
	// 				'Salesforce.com Inc. is a global enterprise software company headquartered in San Francisco, California, '+
	// 				'United States. Best known for its customer relationship management (CRM) product, through acquisitions '+
	// 				'Salesforce has expanded into the "social enterprise arena." It was ranked number 27 in Fortune\'s 100 Best '+
	// 				'Companies to Work For in 2012. <br/><br/> It is listed on the New York Stock Exchange and is a constituent of the '+
	// 				'S&P 500 index.'+
	// 				'United States. Best known for its customer relationship management (CRM) product, through acquisitions '+
	// 				'Salesforce has expanded into the "social enterprise arena." It was ranked number 27 in Fortune\'s 100 Best '+
	// 				'Companies to Work For in 2012. <br/><br/> It is listed on the New York Stock Exchange and is a constituent of the '+
	// 				'S&P 500 index.',
	// 			newsImageUrl: 'http://www.uneecc.org/userfiles/madrid.jpg',
	// 			type: 'Other'
	// 		},
	// 		{ 
	// 			title: '\'NEVER AGAIN\' spreads anti-racism message at Polish music festival', 
	// 			date: '25 December 2011',
	// 			body: 'Salesforce.com Inc. is a global enterprise software company headquartered in San Francisco, California, '+
	// 				'United States. Best known for its customer relationship management (CRM) product, through acquisitions '+
	// 				'Salesforce has expanded into the "social enterprise arena." It was ranked number 27 in Fortune\'s 100 Best '+
	// 				'Companies to Work For in 2012. <br/><br/> It is listed on the New York Stock Exchange and is a constituent of the '+
	// 				'S&P 500 index.'+
	// 				'United States. Best known for its customer relationship management (CRM) product, through acquisitions '+
	// 				'Salesforce has expanded into the "social enterprise arena." It was ranked number 27 in Fortune\'s 100 Best '+
	// 				'Companies to Work For in 2012. <br/><br/> It is listed on the New York Stock Exchange and is a constituent of the '+
	// 				'S&P 500 index.'+
	// 				'Salesforce.com Inc. is a global enterprise software company headquartered in San Francisco, California, '+
	// 				'United States. Best known for its customer relationship management (CRM) product, through acquisitions '+
	// 				'Salesforce has expanded into the "social enterprise arena." It was ranked number 27 in Fortune\'s 100 Best '+
	// 				'Companies to Work For in 2012. <br/><br/> It is listed on the New York Stock Exchange and is a constituent of the '+
	// 				'S&P 500 index.'+
	// 				'United States. Best known for its customer relationship management (CRM) product, through acquisitions '+
	// 				'Salesforce has expanded into the "social enterprise arena." It was ranked number 27 in Fortune\'s 100 Best '+
	// 				'Companies to Work For in 2012. <br/><br/> It is listed on the New York Stock Exchange and is a constituent of the '+
	// 				'S&P 500 index.'+
	// 				'Salesforce.com Inc. is a global enterprise software company headquartered in San Francisco, California, '+
	// 				'United States. Best known for its customer relationship management (CRM) product, through acquisitions '+
	// 				'Salesforce has expanded into the "social enterprise arena." It was ranked number 27 in Fortune\'s 100 Best '+
	// 				'Companies to Work For in 2012. <br/><br/> It is listed on the New York Stock Exchange and is a constituent of the '+
	// 				'S&P 500 index.'+
	// 				'United States. Best known for its customer relationship management (CRM) product, through acquisitions '+
	// 				'Salesforce has expanded into the "social enterprise arena." It was ranked number 27 in Fortune\'s 100 Best '+
	// 				'Companies to Work For in 2012. <br/><br/> It is listed on the New York Stock Exchange and is a constituent of the '+
	// 				'S&P 500 index.', 
	// 			newsImageUrl: 'http://www.uneecc.org/userfiles/madrid.jpg',
	// 			type: 'Other'
	// 		},
	// 		{ 
	// 			title: 'West Riding County FA seeks Chief Executive Officer', 
	// 			date: '03 November 2011',
	// 			body: 'Salesforce.com Inc. is a global enterprise software company headquartered in San Francisco, California, '+
	// 				'United States. Best known for its customer relationship management (CRM) product, through acquisitions '+
	// 				'Salesforce has expanded into the "social enterprise arena." It was ranked number 27 in Fortune\'s 100 Best '+
	// 				'Companies to Work For in 2012. <br/><br/> It is listed on the New York Stock Exchange and is a constituent of the '+
	// 				'S&P 500 index.'+
	// 				'United States. Best known for its customer relationship management (CRM) product, through acquisitions '+
	// 				'Salesforce has expanded into the "social enterprise arena." It was ranked number 27 in Fortune\'s 100 Best '+
	// 				'Companies to Work For in 2012. <br/><br/> It is listed on the New York Stock Exchange and is a constituent of the '+
	// 				'S&P 500 index.', 
	// 			newsImageUrl: 'http://www.uneecc.org/userfiles/madrid.jpg',
	// 			type: 'Other'
	// 		}
	// 	]
	}
});