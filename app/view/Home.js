Ext.define('Kio.view.Home', {
	extend: 'Ext.Panel',
	xtype: 'kio_home_panel',
	
	config: {
		title: 'Home',
		iconCls: 'home',
		scrollable: true,	// the whole panel scrolls
			  
		items: [
			{
				xtype: 'titlebar',
				title: 'Kick it out',
				docked: 'top'
			},
			// {
			// 	xtype: 'toolbar',
   //              title: {
			// 		title: 'Report an incident of discrimination',
			// 		style: {
			// 			'text-align': 'left'
			// 		}
			// 	},
			// 	ui: 'light',
			// 	style: 'font-size: 0.7em'
			// },
			{
				// xtype: 'panel',
				// id: 'kio_showReport_panel',
				// styleHtmlContent: true,
				// scrollable: false,
				// html: [
				// 	'<h3><b>Make a report <img style="float: right; margin-top: 0.4em; " width="25em" height="25em;" src="resources/images/arrow.png"/></b></h3>'
				// ],
			 //    initialize: function() {
			 //        this.relayEvents(this.element, ['tap']);
			 //    }			 	

			 	// new make report panel / button
			 	xtype: 'button',
			 	id: 'kio_home_makeAReport_button',
			 	padding: '15px',
			 	margin: '3px',
			 	text: 'Make a Report of Racism',
			 	ui: 'decline'

			},
			{
				xtype: 'toolbar',
                title: {
					title: 'News',
					style: {
						'text-align': 'left'
					}
				},
				ui: 'light',
				style: 'font-size: 0.7em'
			},
			{
				xtype: 'kio_newsList_list',
				scrollable: false,	// this newsList panel inside the parent one doesn't scroll
				grouped: false
			}
		]
	}
});