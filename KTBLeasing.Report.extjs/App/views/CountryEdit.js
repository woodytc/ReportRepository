Ext.define('MYTREE.views.CountryEdit', {
    extend: 'Ext.window.Window',
    alias: 'widget.countryEdit',
    addMode: false,
    title: 'Country Information',
    layout: 'fit',
    //autoShow: true,

    initComponent: function () {
        this.items = this.buildItems();
        this.buttons = this.buildButtons();
        this.callParent(arguments);
    },
    buildItems: function () {
        return [
                {
                    xtype: 'form',
                    items: [
                        {
                            xtype: 'textfield',
                            itemId: 'code',
                            name: 'code',
                            allowBlank: false,
                            msgTarget: 'side',
                            fieldLabel: 'Country Code',
                            size: 5,
                            maxLength: 5
                        },
                        {
                            xtype: 'textfield',
                            name: 'text',
                            allowBlank: false,
                            msgTarget: 'side',
                            fieldLabel: 'Country Name',
                            size: 31,
                            maxLength: 30
                        },
                        {
                            xtype: 'textfield',
                            name: 'capital',
                            allowBlank: false,
                            msgTarget: 'side',
                            fieldLabel: 'Capital',
                            size: 31,
                            maxLength: 30
                        },
                        {
                            xtype: 'numberfield',
                            name: 'population',
                            value: 0,
                            minValue: 0,
                            fieldLabel: 'Population',
                            decimalPrecision: 0,
                            step: 1.00
                        },
                         {
                             xtype: 'numberfield',
                             name: 'surfaceArea',
                             value: 0,
                             minValue: 0,
                             fieldLabel: 'Surface Area',
                             decimalPrecision: 2,
                             step: 0.01
                         },
                         {
                             xtype: 'numberfield',
                             name: 'lifeExpectancy',
                             value: 0,
                             minValue: 0,
                             fieldLabel: 'Life Expectancy',
                             decimalPrecision: 2,
                             step: 0.01,
                             itemId: 'lifeExpectancy'
                         },
                         {
                             xtype: 'numberfield',
                             name: 'gnp',
                             value: 0,
                             minValue: 0,
                             fieldLabel: 'GNP',
                             decimalPrecision: 2,
                             step: 0.01,
                             itemId: 'gnp'
                         },
                         {
                             xtype: 'hiddenfield',
                             name: 'parentNodeId',
                             itemId: 'parentNodeId'
                         }
                    ]
                }
            ];
    },
    buildButtons: function () {
        return [
                {
                    text: 'Save',
                    action: 'save'
                },
                {
                    text: 'Cancel',
                    scope: this,
                    handler: this.close
                }];
    }

});