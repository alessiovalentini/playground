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

        // data:[];		// temp data
	}
});