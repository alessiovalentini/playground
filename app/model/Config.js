Ext.define('Kio.model.Config', {
	extend: 'Ext.data.Model',
	
	config: {
        fields: ['id', 'recordId', 'latitude', 'longitude', 'currentLocation', 'regularGround', 
        			'name', 'phone', 'email', 'address', 'pushNotifications']
    }
});