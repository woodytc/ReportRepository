Ext.define('DepartmentStore', {
    extend: 'Ext.data.TreeStore',
    model: 'DepartmentModel',
    proxy: {
        type: 'ajax',
        url: 'CountryServlet'
    },
    root: {
        text: 'Tree display of Countries',
        id: 'myTree',
        expanded: true
    },
    folderSort: true,
    sorters: [{
        property: 'text',
        direction: 'ASC'
    }],

    listeners: {
        load: function (tree, node, records) {
            console.log('After loading a node: ' + node);
            if (node.get('checked')) {
                node.eachChild(function (childNode) {
                    childNode.set('checked', true);
                });
            }
        }
    }

});