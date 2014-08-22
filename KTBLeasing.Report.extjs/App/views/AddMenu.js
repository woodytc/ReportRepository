Ext.define('MYTREE.views.AddMenu', {
    extend: 'Ext.menu.Menu',
    alias: 'widget.addMenu',
    width: 120,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'menuitem',
                    text: 'Add',
                    iconCls: 'icon-add'
                }
            ]
        });

        me.callParent(arguments);
    }
});

Ext.define('MYTREE.view.EditMenu', {
    extend: 'Ext.menu.Menu',
    alias: 'widget.editMenu',
    width: 120,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'menuitem',
                    text: 'Edit',
                    iconCls: 'icon-edit'
                },
                {
                    xtype: 'menuitem',
                    text: 'Delete',
                    iconCls: 'icon-delete'  
                }
            ]
        });

        me.callParent(arguments);
    }
});