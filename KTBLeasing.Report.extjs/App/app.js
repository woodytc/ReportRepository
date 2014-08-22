Ext.Loader.setConfig({ 
    enabled: true 
    });


Ext.application({
   
    name: 'MYTREE',
    currentRecord: {},
    appFolder: 'App',
   
    controllers: [
                  'Countries'
              ],

    launch: function() {
        Ext.create('Ext.container.Viewport', {
            items: [
                {
                    xtype: 'countryTree'
                }
            ]
        });
    }
});