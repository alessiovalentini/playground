Ext.define('Kio.view.About', {
	extend: 'Ext.Panel',
	xtype: 'kio_about_panel',
	
	config: {
		title: 'About us',
		iconCls: 'team',
		styleHtmlContent: true,
		scrollable: 'vertical',

		html: [
            '<p><img src="./resources/images/kio-logo.jpg" width="100%"></p>'+
            '<h3><b>Kick It Out is football\'s equality and inclusion campaign</b></h3>'+
            	'<p>Let\'s Kick Racism Out of Football was established in 1993 '+
            	'and Kick It Out established as a body in 1997</p>'+
            	'<p><a href="http://www.kickitout.org/">You can find out more about Kick It Out on our website</a></p>'+
            	'<p>Kick It Out works throughout the football, educational and community sectors to challenge discrimination, '+
            	'encourage inclusive practices and work for positive change</p>'+
            	'<p>The campaign is supported and funded by the game\'s governing bodies, including founding body the...</p>'
        ],
			  
		items: [
			{
				xtype: 'titlebar',
				title: 'About',
				docked: 'top'
			}
		]
	}
});