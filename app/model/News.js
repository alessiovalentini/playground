Ext.define('Kio.model.News', {
	extend: 'Ext.data.Model',
	
	config: {
		identifier: 'uuid',
		fields: ['id','recordId','title', 'body', 'date', 'newsImageUrl', 'type']	// recordId = salesforceID
	},

	// testing purposes
    getNews: function(sf_response){
        
    	console.log('saving news');

        // var decoded_response = JSON.parse(sf_response);

        // // load local storage
        // var news_store = Ext.getStore('News');

        // // for each new news check if present or not
        // for(var i in decoded_response){
        //     // load news with that id from the store
        //     console.log(news_store.getById(decoded_response[i]['recordId']));
        //     var news_local = news_store.getById(decoded_response[i]['recordId']);
        //     if( news_local === null ){
        //         // this news is not present => add it to the local storage
        //         news_store.add(decoded_response[i]);
        //     }else{
        //         // this news is already present => check last modified date
        //         if( news_local['date'] < decoded_response[i]['date'] ){
        //             // the news is updated => remove and add the updated one (or just update field by field)
        //             news_store.remove(news_local);
        //             news_store.add(decoded_response[i]);
        //         }
        //         // else move on
        //     }
        // }
    }

	// fullName: function() {
	// 	var d = this.data,
	// 	names = [
	// 		d.firstName,d.lastName
	// 	];
	// 	return names.join(" ");
	// }
});