Ext.define("Kio.view.Main", {
    extend: 'Ext.tab.Panel',
    xtype: 'kio_main_tabPanel',
	
    config: {

        tabBarPosition: 'bottom',

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
