Ext.define('Kio.store.Ground', {
	extend: 'Ext.data.Store',
	
	config: {
		model: 'Kio.model.Ground',
		data: [
    		{
    			groundName : 'Rosaleda', 
    		},
    		{
    			groundName : 'Bernabeu',
    		}, 
    		{
    			groundName : 'Camp Nou', 
    		}
		]
	}
});