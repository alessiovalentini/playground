Ext.define('Kio.model.Ground', {
	extend: 'Ext.data.Model',
	
	config: {
		identifier: 'uuid',
		fields: ['id','recordId', 'groundName']	// recordId is the salesforceRecordID
	}
});