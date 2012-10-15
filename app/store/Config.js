Ext.define('Kio.store.Config', {
	extend: 'Ext.data.Store',
	
	config: {

		model: 'Kio.model.Config',
        autoLoad:true,
        proxy:{
            type:'localstorage',
            id:'kio_config_localStorage'
        }
	}
});