Ext.define('Kio.model.Config', {
	extend: 'Ext.data.Model',
	
	config: {
        fields: ['id', 'location'],
        proxy: {
            type: 'localstorage',
            id: 'config-user'
        }
    }
});