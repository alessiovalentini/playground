Ext.define('Kio.model.News', {
    extend: 'Ext.data.Model',
    
    config: {
        identifier: 'uuid',
        fields: ['id','recordId','title', 'body', 'date', 'newsImageUrl', 'type']   // recordId = salesforceID
    },

    /******************************************************************************************************** 
     *                                                                                                      *
     *  model methods                                                                                       *
     *                                                                                                      *
     ********************************************************************************************************/
    
    /**
     * Save news in the local storage (for example news returned from SF)
     * @param news_list: PARSED list of news object 
     * @return: # of saved news
     *
     * NOTE: this is a basic implementation deleting and rewriting all the times the news
     */
    saveNews: function(news_list){
        
        // load local storage (in order for this to work must declare it in app.js config)
        var news_store = Ext.getStore('News');

        // for simplicity being the # of news limitated, all the time we empty the local storage and then resave all the news
        news_store.removeAll();
        news_store.sync();
        // write all from sf
        var n_saved_news = 0;
        for( var i = 0; i < news_list.length; i++ ){                
            if( news_store.find('recordId',news_list[i]['recordId']) === -1 ){  // returns position of the record or -1
                news_store.add(news_list[i]);                    
                n_saved_news++;
            }
        }
        news_store.sync();

        return n_saved_news;
    },

    /******************************************************************************************************** 
     *                                                                                                      *
     *  model auxiliary methods                                                                             *
     *                                                                                                      *
     ********************************************************************************************************/

    /**
    * @return: the list of news saved in the local storage
    */     
    getStoredNewsList: function(news_store){

        var local_storage_news_list = news_store.getData()['items'];
        var news_list = [];
        $.each(local_storage_news_list, function(index, item){
            news_list.push(item['data']);
        });
        return news_list; 
    },

    /**
    * @return: list of ids (SF ids) of the news saved in the local storage
    */
    getStoredNewsIds: function(news_store){
     
        var local_storage_news_list = news_store.getData()['items'];
        var news_ids = [];  // new Array()
        $.each(local_storage_news_list, function(index, item){
            news_ids.push(item['data']['recordId']);
        });
        return news_ids; 
    }

});