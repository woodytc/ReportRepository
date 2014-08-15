Ext.define('ListReportForm', {
    extend: 'Ext.Panel',
    constructor: function (config) {
        var me = this;
        var prefix = "ListReportForm-";
        me.prefix = prefix;

        //Define proxy datastore
        var proxyOptions = {
            type: 'ajax',
            reader: {
                type: 'json',
                root: 'items',
                totalProperty: 'total'
            },
            simpleSortMode: true
        };

        //Create datastore
        me.gridStore = Ext.create('Ext.data.JsonStore', {
            id: me.prefix + 'gridStore',
            pageSize: 25,
            model: 'CommonViewModel',
            Filed: ['Id', 'Name'],
            proxy: proxyOptions
        });

        Ext.apply(this, {
            iconCls: 'icon-tabs',
            title: 'บริหารจัดการจัดประเภททรัพย์สิน1',
            layout: 'border',
            autoScroll: true,
            border: true,
            items: [
                    {
                        xtype: 'panel',
                        title: 'บริหารจัดการจัดประเภททรัพย์สิน',
                        bodyStyle: 'padding:5px 5px 0',
                        region: 'north',
                        border: true,
                        defaults: { xtype: 'container', flex: 1, layout: 'anchor' },
                        buttonAlign: 'center',
                        layout: 'hbox',
                        items: [
                                {   // column 1
                                    defaults: { labelWidth: 400 },
                                    defaultType: 'textfield',
                                    margins: '10 5 0 20',
                                    fieldDefaults: { labelAlign: 'right' },
                                    labelStyle: 'text-align: right',
                                    items: [
                                            { id: me.prefix + 'Name', name: 'Name', fieldLabel: 'ประเภททรัพย์สิน', labelStyle: 'text-align: right', emptyText: '[ชื่อประเภททรัพย์สิน]', anchor: '-100' }
                                    ]
                                }
                        ]//end main item in header
                        , buttons: [ //buttons
                                    {
                                    iconCls: 'icon-find',
                                    id: me.prefix + 'user-search-btn-Search',
                                    text: 'ค้นหา',
                                    //Handler event btn search click
                                    handler: function (btn, evt) {
                                        //get value from textbox and combobox

                                        me.Name = Ext.getCmp(me.prefix + 'Name').getValue();

                                        me.search(window.gridReportData, me.Name);
                                    } // end handler
                                }, {
                                    iconCls: 'icon-reload',
                                    id: me.prefix + 'user-btn-Reset',
                                    text: 'ล้าง',
                                    handler: function (btn, evt) {
                                        Ext.getCmp(me.prefix + 'Name').setValue('');
                                    } // end handler
                                }
                          ] // end buttons Header
                    }//end Header

            , {
                xtype: 'grid',
                id: me.prefix + 'grid',
                title: 'รายชื่อรายงาน',
                columnLines: true,
                //  autoScore: true,
                region: 'center',
                store: me.gridStore,
                columnLines: true,
                columns: [
            { text: 'รหัสรายงาย', dataIndex: 'Id', width: '20%', sortable: false, align: 'center' },
            { text: 'ชื่อรายงาน', dataIndex: 'Name', width: '80%', sortable: false, align: 'felt'}//,
                //{ text: 'จำนวนนับ', dataIndex: 'unit', width: 250, sortable: false, align: 'center' },
            ],

                bbar: Ext.create('Ext.PagingToolbar', {
                    id: me.prefix + 'PagingToolbar',
                    store: me.gridStore
            , displayInfo: true
            , displayMsg: 'ประเภททรัพย์สิน {0} - {1} of {2}'
            , emptyMsg: "ไม่มี ประเภททรัพย์สิน"
                }),
                viewConfig: {
                    listeners: {
                        //itemdblclick: me.popUpEditItem
                        itemdblclick: function () { 
//                                new Ext.Window({
//                                title: 'Hello World Window',
//                                html: 'Am I the right size?',
//                                height: Ext.getBody().getViewSize().height,
//                                width: Ext.getBody().getViewSize()
                            //                            }).show();
                            window.open('http://user-pc/ReportServer/Pages/ReportViewer.aspx?%2fReports%2frptYield1&rs:Command=Render');
                            }
                    }
                }, //end view config

                dockedItems: [
            {
                xtype: 'toolbar',
                items: [{
                    iconCls: 'icon-details',
                    text: 'แสดงรายงาน',
                    tooltip: 'แสดงรายงาน',
                    disabled: false,
                    handler: function (btn, evt) {
                        var gridpanel = btn.up().up();
                        var recordSelected = gridpanel.getSelectionModel().getSelection();
                        if (recordSelected.length == 1) {
                            console.log('windows');
                            new Ext.Window({
                                title: 'Hello World Window',
                                html: 'Am I the right size?',
                                height: Ext.getBody().getViewSize().height,
                                width: Ext.getBody().getViewSize()
                            }).show();
                            //me.popUpEditItem(gridpanel, recordSelected[0], btn);
                        }
                    } //end handler
                }] // end items
            }]//end dockedItems
            }//end grid

            ]//end item
        }); //end apply
        //me.gridStore.setpro
        ListReportForm.superclass.constructor.apply(this, arguments);
    } // end constructor
});

//fn update
ListReportForm.prototype.popUpEditItem = function (dataview, record, parent, mode) {
    var id = record.get('Id');
    var name = record.get("Name");
    ListReportForm.prototype.popUpEditListReport(id, name);
};

//fn search
ListReportForm.prototype.search = function (url, name) {
    var prefix = 'ListReportForm-';
    console.log("search");
    var quickStore = Ext.getStore(prefix + 'gridStore');
    
    console.log(quickStore);
    console.log(url);
    console.log(name);
    quickStore.proxy.url = url;
    quickStore.getProxy().extraParams.Name = name;
    var pagingToolbar = Ext.getCmp(prefix + 'PagingToolbar');
    pagingToolbar.moveFirst();

};

//popup window updatefrom
ListReportForm.prototype.popUpEditListReport = function (id, name) {
    var prefix = 'updateListReport-';
    var url = window.updateListReport;
    var required = '<span style="ListReport:red;font-weight:bold" data-qtip="Required">*</span>';
    
    var win = new Ext.Window({
        id: prefix + 'update',
        iconCls: 'icon-details',
        title: 'ปรับปรุงประเภททรัพย์สิน',
        y: 20,
        width    :500,
        //height   :args.height * 1.0 ||200,
        resizable: false,
        modal: true,
        buttonAlign: 'center',
        //            autoScroll: true,
        layout: 'vbox',
        xtype: 'fieldset',
        defaultType: 'textfield',
        //layout: { type: 'table', columns: 1 },
        defaults: { style: 'margin:2px 5px;', labelWidth: 170 },
        items: [
                { id: prefix + 'ID', name: 'ID', fieldLabel: 'รหัส', labelStyle: 'text-align: right'
                    , afterLabelTextTpl: required, xtype: 'textfield', fieldStyle: 'text-align: right', allowBlank: false,readOnly:true},
                { id: prefix + 'name', name: 'name', fieldLabel: 'ชื่อประเภททรัพย์สิน', labelStyle: 'text-align: right'
                    , afterLabelTextTpl: required, xtype: 'textfield', fieldStyle: 'text-align: right', allowBlank: false }
                ],
        buttons: [{
            text: 'ปรับปรุง',
            onClick: function (button) {
                
                Ext.Ajax.request({
                    method: 'post',
                    url: url,
                    params: {
                                ID: Ext.getCmp(prefix + 'ID').getValue(),
                                name: Ext.getCmp(prefix + 'name').getValue()
                            },
                    success: function (response) {
                        var text = response.responseText;
                        Ext.MessageBox.alert('Status', 'เปลื่ยนแปลงประเภททรัพย์สินเรียบร้อยแล้ว');
                        ListReportForm.prototype.search(window.gridListReportData, "");
                    }
                });

                win.destroy();

            }
        },
                {
                    iconCls: 'icon-cancel',
                    text: 'ยกเลิก',
                    name: 'button-cancel',
                    handler: function (btn, evt) {
                        intend = "cancel";
                        win.destroy();
                    }
                }]
    }).show();
//set data
    Ext.getCmp(prefix + 'name').setValue(name);
    Ext.getCmp(prefix + 'ID').setValue(id);
}


//delete ListReport
ListReportForm.prototype.deleteListReport = function (dataview, reconds, type) {
    var ListReportIds = [];
    for (var i = 0; i < reconds.length; i++) {
        var id = reconds[i].get('Id');
        //console.log(id);
        ListReportIds.push(id);
    }
    var method = window.deleteListReport;
    
    Ext.MessageBox.show({
        msg: 'Please wait update status items...',
        width: 300,
        closable: false
    });

    $.ajax({
        type: "POST",
        cache: false,
        data: Ext.encode(ListReportIds),
        //async: false,
        url: method,
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (result) {
            Ext.MessageBox.hide();
            var me = this
            me.url = window.gridListReportData
            if (result.success) {
                Ext.MessageBox.alert('Status', result.message);
                ListReportForm.prototype.search(me.url,"");
            }
            else {
                Ext.MessageBox.alert('Status', "Error: " + result.message);
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status + " " + thrownError);
            Ext.MessageBox.hide();
        }
    });
};



