Ext.define("Kio.view.Main", {
    extend: 'Ext.tab.Panel',
    xtype: 'kio_main_tabPanel',

    // required to use the defined xtype in the items list
    requires: [
        'Kio.view.Home',
        'Kio.view.Report',
        'Kio.view.News',
        'Kio.view.About',
        'Kio.view.Setting'
    ],

    config: {

        tabBar: {
            docked: 'bottom',
            layout: {
                pack: 'center'
            }
        },

        items: [
            {
                xtype: 'kio_home_panel'
            },
            {
                xtype: 'kio_report_panel'
            },
			{
				xtype: 'kio_news_panel'
			},
			{
				xtype: 'kio_about_panel'
			},
			{
				xtype: 'kio_setting_panel'
			}
        ]
    }
});
