Ext.define('EQPForm', {
    extend: 'Ext.Panel',
    constructor: function (config) {
        var me = this;
        var prefix = "EQPForm-";
        me.prefix = prefix;

        //Define proxy datastore
        var proxyOptions = {
            type: 'ajax',
            reader: {
                type: 'json',
                root: 'items',
                totalProperty: 'total'
            }, sorters: [{
                property: 'AssetID',
                direction: 'ASC'
            }, {
                property: 'EQPCode',
                direction: 'ASC'
            }],
            simpleSortMode: true
        };

        //Create datastore
        me.gridStore = Ext.create('Ext.data.JsonStore', {
            id: me.prefix + 'gridStore',
            groupField: 'EQPCode',
            pageSize: 25,
            model: 'EQPModel',
            proxy: proxyOptions
        });
        
        Ext.apply(this, {
            iconCls: 'icon-tabs',
            title: 'รายการทรัพย์สิน',
            layout: 'border',
            autoScroll: true,
            border: true,
            items: [
                    {
                        xtype: 'panel',
                        title: 'บริหารจัดการทรัพย์สิน',
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
                                            { id: me.prefix + 'Name', name: 'Name', fieldLabel: 'รายการทรัพย์สิน', labelStyle: 'text-align: right', emptyText: '[ ประเภททรัพย์ ]', anchor: '-100' }
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

                                        me.search(window.GridGetEQP, me.Name);
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
                title: 'รายการทรัพย์สิน',
                columnLines: true,
                //  autoScore: true,
                region: 'center',
                store: me.gridStore,
                columnLines: true,
                selModel: Ext.create('Ext.selection.CheckboxModel'),
                columns: [
            { text: 'รหัสทรัพย์สิน', dataIndex: 'EQPCode', width: '10%', sortable: true, align: 'felt' },
            { text: 'ชื่อทรัพย์สิน', dataIndex: 'EQPDescription', flex: 1, sortable: true, align: 'felt' }
            ],
                bbar: Ext.create('Ext.PagingToolbar', {
                    id: me.prefix + 'PagingToolbar',
                    store: me.gridStore
            , displayInfo: true
            , displayMsg: 'รายการทรัพย์สิน {0} - {1} จากทั้งหมด {2}'
            , emptyMsg: "ไม่มี รายการทรัพย์สิน"
                }),
                viewConfig: {
                    listeners: {
                        itemdblclick: me.popUpEditItem
                    }
                }, //end view config

                dockedItems: [
            {
                xtype: 'toolbar',
                items: [{
                    iconCls: 'icon-edit',
                    text: 'แก้ไข',
                    tooltip: 'แก้ไขรายการทรัพย์สิน',
                    disabled: false,
                    handler: function (btn, evt) {
                        var gridpanel = btn.up().up();
                        var recordSelected = gridpanel.getSelectionModel().getSelection();
                        if (recordSelected.length > 0) {
                            me.popUpEditItem(gridpanel, recordSelected[0], btn);
                        }
                    } //end handler
                },
                {
                    iconCls: 'icon-delete',
                    text: 'ลบ',
                    tooltip: 'ลบรายการทรัพย์สิน',
                    disabled: false,
                    handler: function (btn, evt) {
                        var gridpanel = btn.up().up();
                        var recordSelected = gridpanel.getSelectionModel().getSelection();
                        if (recordSelected.length > 0) {
                            Ext.MessageBox.confirm('Confirm', 'คุณต้องการลบรายการทรัพย์สินหรือไม่ ?', function (e) {
                                if (e == 'yes')
                                    me.deleteListReport(gridpanel, recordSelected, btn);
                            });
                        }
                    } //end handler
                }, '->',
                {
                    iconCls: 'icon-add',
                    text: 'เพิ่ม',
                    tooltip: 'เพิ่มรายการทรัพย์สิน',
                    disabled: false,
                    handler: function (btn, evt) {
                        me.Insert();
                    } //end handler
                }] // end items
            }]//end dockedItems
            }//end grid

            ]//end itme
        }); //end apply
        //me.gridStore.setpro
        EQPForm.superclass.constructor.apply(this, arguments);
    } // end constructor
});

//fn update
EQPForm.prototype.popUpEditItem = function (dataview, record, parent, mode) {
    /* [20140822] Thawatchai.T send data to window popup */
    var quickConfWindow = new EQPWindow(
                            {
                                listeners: {
                                    close: function (panel, eOpts) {
                                        if (panel.intend === 'save-success') {
                                            EQPForm.prototype.search(window.GridGetEQP, "");
                                            quickConfWindow.destroy(panel);
                                            quickConfWindow.destroy(mode);
                                        }
                                    }
                                }
                            });
    quickConfWindow.url = window.UpdateEQP;
    quickConfWindow.display(record);
    quickConfWindow.show();
};
EQPForm.prototype.Insert = function () { 0
    var quickConfWindow = new EQPWindow(
                            {
                                listeners: {
                                    close: function (panel, eOpts) {
                                        if (panel.intend === 'save-success') {
                                            EQPForm.prototype.search(window.GridGetEQP, "");
                                            quickConfWindow.destroy(panel);
                                        }
                                    }
                                }
                            });
    quickConfWindow.url = window.CreateEQP;
    quickConfWindow.show();
};
//fn search
EQPForm.prototype.search = function (url, name) {
    var prefix = 'EQPForm-';
    var quickStore = Ext.getStore(prefix + 'gridStore');

    quickStore.proxy.url = url;
    quickStore.getProxy().extraParams.Name = name;
    var pagingToolbar = Ext.getCmp(prefix + 'PagingToolbar');
    pagingToolbar.moveFirst();

};

//delete ListReport
EQPForm.prototype.deleteListReport = function (dataview, record, type) {
    var ListReportIds = [];
    for (var i = 0; i < record.length; i++) {
        var id = record[i].data.EQPCode;
        ListReportIds.push(id);
    }
    var method = window.DeleteEQP;

    Ext.MessageBox.show({
        msg: 'กำลังประมวลผล ...',
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
            me.url = window.gridmappingasset;
            if (result.success) {
                Ext.MessageBox.alert('Status', result.message);
                EQPForm.prototype.search(me.url, "");
            }
            else {
                //Ext.MessageBox.alert('Status', "Error: " + result.message);
                Ext.MessageBox.alert({
                    title: 'Warning', //<- the dialog's title
                    msg: 'ข้อมูลมีการ Mapping อยู่ ' + result.message, //<- the message
                    buttons: Ext.Msg.YES, //<- YES and NO buttons
                    icon: Ext.Msg.WARNING, // <- error icon
                });
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status + " " + thrownError);
            Ext.MessageBox.hide();
        }
    });
};



