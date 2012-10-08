Ext.define('Kio.store.Report', {
	extend: 'Ext.data.Store',
	
	config: {
		model: 'Kio.model.Report'
	},

	proxy: {
		type:'localstorage',
        id:'kio_reports_localStorage'
	}
});