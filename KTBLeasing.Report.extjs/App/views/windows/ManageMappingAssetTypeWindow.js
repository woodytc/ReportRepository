Ext.define('ManageMappingAssetTypeWindow', {
    extend: 'Ext.Window',
    initComponent: function () {
        var me = this;
        var prefix = "quickconfwindow-";
        me.prefix = prefix;
        me.items = [];

        var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';

        //Define proxy datastore
        var proxyOptions = {
            type: 'ajax',
            url: window.getMasterAssetType,
            reader: {
                type: 'json',
                root: 'items',
                totalProperty: 'total'
            },
            simpleSortMode: true
        };

        var proxyOptionsCombo = {
            type: 'ajax',
            url: window.getMasterAssetType,
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
            groupField: 'AssetType',
            pageSize: 25,
            proxy: proxyOptions,
            model: 'Report.model.MappingAssetModel'
        });

        me.commboboxStore = Ext.create('Ext.data.JsonStore', {
            id: me.prefix + 'comboStore',
            fields: ['name', 'value'],
            proxy: proxyOptionsCombo,
            autoLoad: true
        });

        var combobox = Ext.create('Ext.form.ComboBox', {
            id: me.prefix + 'assetType',
            name: 'AssetID',
            fieldLabel: 'เลือกกลุ่ม ประเภททรัพย์สิน',
            store: me.commboboxStore,
            queryMode: 'local',
            valueField: 'name',
            displayField: 'value',
            width: 700,
            labelWidth: 200,
            labelStyle: 'text-align: right',
            allowBlank: false
        });

        var grid = Ext.create('Ext.grid.Panel', {
            title: 'รายการทรัพย์สิน',
            id: prefix + 'Yeah',
            store: me.gridStore,
            columns: [
                        { text: 'ID', dataIndex: 'ID', width: '77', sortable: true, align: 'center',hidden:true },
                        { text: 'รหัสทรัพย์สิน', dataIndex: 'EQPCode', width: '14%', sortable: true, align: 'felt' },
                        { text: 'รหัสประเภททรัพย์สิน', dataIndex: 'AssetID', width: '20%', sortable: true, align: 'felt' },
                        { text: 'ชื่อทรัพย์สิน', dataIndex: 'EQPDescription', flex: 1, sortable: true, align: 'felt' },
                        { text: 'ชื่อประเภททรัพย์สิน', dataIndex: 'AssetType', flex: 1, sortable: true, align: 'felt' },
                        { text: 'UpdateDate', dataIndex: 'UpdateDate',  sortable: true, align: 'center', hidden: true },
                        { text: 'UpdateUser', dataIndex: 'UpdateUser',  sortable: true, align: 'center', hidden: true },
                        { text: 'IsDelete', dataIndex: 'IsDelete',  sortable: true, align: 'center', hidden: true }
                    ]
        });
        /** ==============================================================  END Store ==============================*/

        //Display
        Ext.apply(me, {
            iconCls: 'icon-details',
            title: 'Mapping Asset Type',
            y: 20,
            resizable: false,
            modal: true,
            buttonAlign: 'center',
            layout: 'vbox',
            items: [
            {
                xtype: 'form',
                id: me.prefix + 'form-info',
                maxHeight: 600,
                width: 750,
                defaultType: 'textfield',
                buttonAlign: 'center',
                autoScroll: true,
                defaults: { style: 'margin:10px 10px 10px 10px;'},
                items: [combobox, grid]
                //items: [mainParameterFields, FunctionFields]
            }],
            buttons: [
            {
                iconCls: 'icon-save',
                text: 'Save',
                id: me.prefix + 'conf-button-save',
                handler: function (btn, evt) {

                    var dictionary = {}; //create new object
                    var dictionaryarr = [];

                    var form = me.down('form').getForm();
                    var store = Ext.getCmp(prefix + 'Yeah').getStore();
                    for (var i = 0; i < store.data.items.length; i++) {

                        dictionaryarr.push(store.data.items[i].data);
                    };
                    
                    if (form.isValid()) {
                        form.submit({
                            url: window.CreateMappingAsset, 
                            params: {
                               listGird: Ext.encode(dictionaryarr)
                            },
                            success: function (form, action) {
                                Ext.Msg.alert('Success', action.result.message);
                                me.intend = "save-success";
                                me.close();
                            },
                            failure: function (form, action) {
                                Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                            }
                        });
                    }else{
                        Ext.Msg.alert('Data is not valid!', 'กรุณาเลือกข้อมูลทรัพย์สิน');
                    }
                    
                  //  me.close();
                } // end handler
            }, {
                iconCls: 'icon-cancel',
                text: 'Cancel',
                name: 'button-cancel',
                handler: function (btn, evt) {
                    me.intend = "cancel";
                    me.close();

                }
            }]
        }); // end Ext.apply
        ManageMappingAssetTypeWindow.superclass.initComponent.apply(me, arguments);
    } // end initComponent
});

ManageMappingAssetTypeWindow.prototype.filterConf = function (combo, mode) {
    var prefix = "quickconfwindow-";
    this.getFunctionFields().hide();
}

ManageMappingAssetTypeWindow.prototype.setPravameter = function (reportid, prametername) {
    var prefix = "quickconfwindow-";

    switch (prametername) {
        case "Function":
            Ext.getCmp(prefix + 'getFunctionFields').show();
            break;
        default:
    }
}

ManageMappingAssetTypeWindow.prototype.getFunctionFields = function () {
    return Ext.getCmp(this.prefix + 'FunctionFields');
}


/** [20140822] Thawatchai.T add setRecord to window popup 
*    syntax set value 
*    Ext.getCmp(UI ID).setvalue(value)
*/


ManageMappingAssetTypeWindow.prototype.display = function (record) {
    var prefix = "quickconfwindow-";
    var store = Ext.getCmp(prefix + 'Yeah').getStore();
    var arr = [];

    if(!Array.isArray(record)){
        var rec = new Report.model.MappingAssetModel({
            ID: record.data.ID,
            AssetID: record.data.AssetID,
            EQPCode: record.data.EQPCode,
            EQPDescription: record.data.EQPDescription,
            AssetType: record.data.AssetType,
            UpdateDate: record.data.UpdateDate,
            UpdateUser: record.data.UpdateUser,
            IsDelete: record.data.IsDelete,
        });
        store.insert(i, rec);
    }

    for (var i = 0; i < record.length; i++) {
        var rec = new Report.model.MappingAssetModel({
            ID: record[i].data.ID,
            AssetID: record[i].data.AssetID,
            EQPCode: record[i].data.EQPCode,
            EQPDescription: record[i].data.EQPDescription,
            AssetType: record[i].data.AssetType,
            UpdateDate: record[i].data.UpdateDate,
            UpdateUser: record[i].data.UpdateUser,
            IsDelete: record[i].data.IsDelete,
        });
        store.insert(i, rec);
    }
    //    Ext.getCmp(prefix + "assetType").setValue(record.data.AssetID);

}

ManageMappingAssetTypeWindow.prototype.mapping = function (e, v) {
    var prefix = "quickconfwindow-";

    var reportid = record.data.id
}

ManageMappingAssetTypeWindow.prototype.GetParameter = function (id) {

    ids = { id: id };
    Ext.Ajax.request({
        type: "Post",
        cache: false,
        params: {
            id: id
        },
        url: window.getParameterreport,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {

            var pararesult = Ext.decode(result.responseText);

            var arr = []
            var obj = {};
            var ReportName = "";
            Ext.each(pararesult.items, function (pr) {
                obj = { name: pr.ParameterName }
                arr.push(obj);

//                ManageMappingAssetTypeWindow.prototype.setPravameter(pr.ReportID, pr.ParameterName);
            });
            Ext.getCmp('quickconfwindow-parameterName').setValue(Ext.encode(arr));

            if (pararesult.Success) {

            }
            else {

            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            if (jqXHR.responseText) {
                var arrErr = jqXHR.responseText.split('p>');
                if (arrErr.length > 2)
                    Ext.Msg.alert("Status", arrErr[1].substring(0, arrErr[1].length - 2));
            }
        }
    });
}




