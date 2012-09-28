Ext.define('Kio.store.Ground', {
	extend: 'Ext.data.Store',
	
	config: {
		model: 'Kio.model.Ground',
		data: [
    		{
                // We have to find out a way to change this value dinamically
                // its not the same in settings and make report view
    			groundName : 'Choose a Ground',     
    		},
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