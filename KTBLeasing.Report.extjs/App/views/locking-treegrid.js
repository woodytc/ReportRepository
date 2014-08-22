var examlibstore = Ext.create('Ext.data.TreeStore', {
        proxy: {
            type: 'ajax',
            //url: "Authority/GetAuthority",
            url: "http://www.cnblogs.com/ExamPaper/GetExamlibTree/",

            actionMethods: 'post'
        },
        sorters: [{
            property: 'leaf',
            direction: 'ASC'
        }, {
            property: 'text',
            direction: 'ASC'
        }]
    });
 

, {
fieldLabel: 'yyyy',
name: 'paraID',
id: 'paraID',
xtype: 'combotree',
store: examlibstore,
allowBlank: false,
blankText: "xxxxx"
}