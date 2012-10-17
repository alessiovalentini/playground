Ext.define('Kio.model.Ground', {
	extend: 'Ext.data.Model',
	
	config: {
		identifier: 'uuid',
		fields: ['id','recordId', 'groundName']	// recordId is the salesforceRecordID
	},

	/******************************************************************************************************** 
     *                                                                                                      *
     *  model methods                                                                                       *
     *                                                                                                      *
     ********************************************************************************************************/
    
    /**
     * Save grounds in the local storage
     * @param grounds_list: PARSED list of grounds object
     * @return: # of saved grounds
     *
     * NOTE: this is a basic implementation deleting and rewriting all the times the grounds
     */
	saveGrounds: function(grounds_list){

		// load local storage (in order for this to work must declare it in app.js config)
        var grounds_store = Ext.getStore('Ground');

        // remove all the grounds  *** IMPROVE *** not removing grounds
        grounds_store.removeAll();
        grounds_store.sync();
        // write all from sf
        var grounds = new Array();          
        for(var i in grounds_list){
         
            // recordId, groundName
            var ground = {

                recordId: grounds_list[i]['Id'],
                groundName: grounds_list[i]['Name']

            }            
            grounds.push(ground);
        }        
        // one single dml
        grounds_store.add(grounds);
        grounds_store.sync();

        return grounds.length;
	}
});