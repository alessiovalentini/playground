Ext.define('Kio.model.Report', {
	extend: 'Ext.data.Model',
	
	config: {
		identifier: 'uuid',
        fields: ['id','recordId', 'groundId', 'reportDate', 'description','name','phone','email','address']
    },

    getReportsBatch: function(){

    	// get report store
		var reportsStore = Ext.getStore('Report');

    	// iterate through the records and create the batch array
        // note: at the end the actual records are in the reports_batch[i]['data']
        var reports_batch = [];
		reportsStore.each(function(report) {
		   	reports_batch.push(report['data']);
		});

		// creating expected sf report batch object
		var sf_reports_batch = {
			// the only one attribute is the reports batch array
			reportList: reports_batch
		};

		console.log('- prepared batch of ' + reports_batch.length + ' reports to be sent to salesforce:')
		console.log(sf_reports_batch);

    	return sf_reports_batch;
    }



});