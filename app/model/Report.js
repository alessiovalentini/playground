Ext.define('Kio.model.Report', {
	extend: 'Ext.data.Model',
	
	config: {
		identifier: 'uuid',
        fields: ['id','recordId', 'groundId', 'reportDate', 'description','name','phone','email','address']
    }
});