Ext.define('Kio.model.Report', {
	extend: 'Ext.data.Model',
	
	config: {
        fields: ['id', 'recordId', 'groundId', 'date', 'description','name','phone','email','address']
    }
});