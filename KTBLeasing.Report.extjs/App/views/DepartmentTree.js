Ext.require([
    'Ext.tree.*',
    'Ext.data.*',
    'Ext.window.MessageBox'
]);

Ext.define('DepartmentTree', {
    extend: 'Ext.tree.Panel',
    initComponent: function () {
        var me = this;
        var prefix = "departmentTree-";
        me.prefix = prefix;
        me.items = [];

        Ext.define('Task', {
            extend: 'Ext.data.Model',
            fields: [
            { name: 'text', type: 'string' },
            { name: 'id', type: 'int' }
        ]
        });

        var store = Ext.create('Ext.data.TreeStore', {
            model: 'Task',
            proxy: {
                type: 'ajax',
                //the store will get the content from the .json file
                url: window.treedata
            },
            folderSort: true
        });

        me.gridview = {
            title: 'Core Team Projects',
            width: 500,
            height: 300,
            //renderTo: Ext.getBody(),
            collapsible: true,
            useArrows: true,
            rootVisible: false,
            store: store,
            multiSelect: true,
            columns: [{
                xtype: 'treecolumn', //this is so we know which column will show the tree
                text: 'text',
                width: 200,
                sortable: true,
                dataIndex: 'text'
            }]
        }

        Ext.apply(this, {
            iconCls: 'icon-tabs',
            title: 'แสดงรายงาน',
            layout: 'border',
            autoScroll: true,
            border: true,
            items: [me.gridview]
        });
        DepartmentTree.superclass.initComponent.apply(me, arguments);
    }
});