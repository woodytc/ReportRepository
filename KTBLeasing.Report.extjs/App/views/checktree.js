Ext.require([
    'Ext.tree.*',
    'Ext.data.*',
    'Ext.window.MessageBox'
]);

Ext.onReady(function () {

    var store = Ext.create('storetree', {
        extend: 'Ext.data.TreeStore',
        proxy: {
            type: 'ajax',
            //url: xxx
            url: window.treedata
        }
        
    });

    var tree = Ext.create('Ext.tree.Panel', {
        store: store,
        rootVisible: false,
        useArrows: true,
        frame: true,
        title: 'Check Tree',
        renderTo: 'tree-div',
        width: 450,
        height: 500,
        dockedItems: [{
            xtype: 'toolbar',
            items: {
                text: 'Get checked nodes',
                handler: function () {
                    var records = tree.getView().getChecked(),
                        names = [];

                    Ext.Array.each(records, function (rec) {
                        names.push(rec.get('text'));
                    });

                    Ext.MessageBox.show({
                        title: 'Selected Nodes',
                        msg: names.join('<br />'),
                        icon: Ext.MessageBox.INFO
                    });
                }
            }
        }]
    });
});