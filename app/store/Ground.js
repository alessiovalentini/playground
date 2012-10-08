Ext.define('Kio.store.Ground', {
	extend: 'Ext.data.Store',
	
	config: {
		model: 'Kio.model.Ground',
		
        proxy: {
            type:'localstorage',
            id:'kio_grounds_localStorage'
        }

  //       data: [
  //   		{
  //   			groundName : 'a00J0000002ZebWIAS',   // hardcoded from SF (old trafford in sf)
  //   		},
  //   		{
  //   			groundName : 'Bernabeu',
  //   		}, 
  //   		{
  //   			groundName : 'Camp Nou', 
  //   		}
		// ]
	}
});