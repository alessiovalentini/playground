Ext.define('Kio.view.NewsDetail', {	

	extend: 'Ext.Panel',
	xtype: 'kio_newsDetail_panel',
	
	config: {
		scrollable: 'vertical',
		styleHtmlContent: true,
		
		tpl: '<p>'+
				'<b style="font-size: 1.5em">{title}</b><br/>'+
				'<i>{date}</i><br/>'+
				'<img src="{newsImageUrl}" width="100%" style="margin: 0.7em 0"><br/>'+
				'{body}'+
			 '</p>',
			  
		items: [ 
			{
				xtype: 'titlebar',
				title: 'News',
				docked: 'top',
				
				items: {
					xtype: 'button',
					text: 'Back',
					ui: 'back',
					id: 'kio_backHome_button'
				}
			}
		]
	}

});		