Ext.define('MappingAssetTypeForm', {
    extend: 'Ext.Panel',
    constructor: function (config) {
        var me = this;
        var prefix = "MappingAssetTypeForm-";
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
            groupField: 'AssetType',
            pageSize: 200,
            model: 'Report.model.MappingAssetModel',
            proxy: proxyOptions
        });

        Ext.apply(this, {
            iconCls: 'icon-tabs',
            title: 'จัดกลุ่มประเภททรัพย์สิน',
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
                                            { id: me.prefix + 'Name', name: 'Name', fieldLabel: 'ประเภททรัพย์', labelStyle: 'text-align: right', emptyText: '[ ประเภททรัพย์ ]', anchor: '-100' }
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

                                        me.search(window.gridmappingasset, me.Name);
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
                title: 'จัดกลุ่มประเภททรัพย์สิน',
                columnLines: true,
                //  autoScore: true,
                region: 'center',
                store: me.gridStore,
                columnLines: true,
                features: [{
                    ftype: 'grouping',
                    groupHeaderTpl: 'Group: {name} ({rows.length})',
                    startCollapsed: true,
                }],
                selModel: Ext.create('Ext.selection.CheckboxModel'),
                columns: [
            { text: 'ID', dataIndex: 'ID', sortable: true, align: 'center', hidden: true },
            { text: 'รหัสกลุ่มทรัพย์สิน', dataIndex: 'EQPCode', width: '10%', sortable: true, align: 'felt' },
            { text: 'รหัสประเภททรัพย์สิน', dataIndex: 'AssetID', width: '15%', sortable: true, align: 'felt', hidden: true },
            { text: 'ชื่อทรัพย์สิน', dataIndex: 'EQPDescription', flex: 1, sortable: true, align: 'felt' },
            { text: 'ชื่อประเภททรัพย์สิน', dataIndex: 'AssetType', flex: 1, sortable: true, align: 'felt' },
            { text: 'UpdateDate', dataIndex: 'UpdateDate', sortable: true, align: 'center', hidden: true },
            { text: 'UpdateUser', dataIndex: 'UpdateUser', sortable: true, align: 'center', hidden: true },
            { text: 'IsDelete', dataIndex: 'IsDelete', sortable: true, align: 'center', hidden: true }
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
                    text: 'จัดกลุ่ม',
                    tooltip: 'จัดกลุ่มประเภททรัพย์สิน',
                    disabled: false,
                    handler: function (btn, evt) {
                        var gridpanel = btn.up().up();
                        var recordSelected = gridpanel.getSelectionModel().getSelection();
                        if (recordSelected.length > 0) {
                            me.popUpEditItem(gridpanel, recordSelected, btn);
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


                        //                        if (recordSelected.length == 1) {
                        //                            me.popUpEditItem(gridpanel, recordSelected[0], btn);
                        //                        }
                        //.popUpEditItem(gridpanel, recordSelected, btn);
                    } //end handler
                }] // end items
            }]//end dockedItems
            }//end grid

            ]//end itme
        }); //end apply
        //me.gridStore.setpro
        MappingAssetTypeForm.superclass.constructor.apply(this, arguments);
    } // end constructor
});

//fn update
MappingAssetTypeForm.prototype.popUpEditItem = function (dataview, record, parent, mode) {
    /* [20140822] Thawatchai.T send data to window popup */
    var quickConfWindow = new ManageMappingAssetTypeWindow(
                            {
                                listeners: {
                                    close: function (panel, eOpts) {
                                        if (panel.intend === 'save-success') {
                                            MappingAssetTypeForm.prototype.search(window.gridmappingasset, "");

                                            quickConfWindow.destroy(panel);
                                        }
                                    }
                                }
                            });
    quickConfWindow.display(record);
    quickConfWindow.show();
};

//fn search
MappingAssetTypeForm.prototype.search = function (url, name) {
    var prefix = 'MappingAssetTypeForm-';
    var quickStore = Ext.getStore(prefix + 'gridStore');
    quickStore.proxy.url = url;
    quickStore.getProxy().extraParams.Name = name;

    var pagingToolbar = Ext.getCmp(prefix + 'PagingToolbar');
    pagingToolbar.moveFirst();

    var view = Ext.getCmp(prefix + 'grid').view;
    console.log(view);
//    view.features[0].startCollapsed = true;
};

//delete ListReport
MappingAssetTypeForm.prototype.deleteListReport = function (dataview, record, type) {
    var ListReportIds = [];
    for (var i = 0; i < record.length; i++) {
        var id = record[i].data.ID;
        ListReportIds.push(id);
    }
    var method = window.DeleteMappingAsset;

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
                MappingAssetTypeForm.prototype.search(me.url, "");
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



