Ext.define('EQPWindow', {
    extend: 'Ext.Window',
    initComponent: function () {
        var me = this;
        var prefix = "quickconfwindow-";
        me.prefix = prefix;

        var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';

        /** ==============================================================  END Store ==============================*/

        //Display
        Ext.apply(me, {
            iconCls: 'icon-details',
            //title: '',
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
                defaults: { style: 'margin:5px 5px 2px 10px;', labelWidth: 180, anchor: '100%' },
                items: [{
                            xtype: 'numberfield',
                            id:me.prefix+'-EQPCode',
                            name: 'EQPCode',
                            fieldLabel: 'EQPCode',
                            labelStyle: 'text-align: right',
                            afterLabelTextTpl: required,
                            minValue: 1,
                            emptyText: '[รหัสรายการทรัพย์สิน]',
                            allowBlank: false  // requires a non-empty value
                        },
                        {
                            xtype: 'textfield',
                            id:me.prefix+'-EQPDescription',
                            name: 'EQPDescription',
                            fieldLabel: 'EQPDescription',
                            labelStyle: 'text-align: right',
                            afterLabelTextTpl: required,
                             emptyText: '[รายการทรัพย์สิน]',
                            allowBlank: false  // requires a non-empty value
                        }]
                //items: [mainParameterFields, FunctionFields]
            }],
            buttons: [
            {
                iconCls: 'icon-save',
                text: 'Save',
                id: me.prefix + 'conf-button-save',
                handler: function (btn, evt) {

                    var form = me.down('form').getForm();
                    
                    if (form.isValid()) {
                        form.submit({
                            url: me.url, 
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
                        Ext.Msg.alert('Data is not valid!', 'กรุณาเลือกข้อมูลให้ครบถ้วน');
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
        EQPWindow.superclass.initComponent.apply(me, arguments);
    } // end initComponent
});

EQPWindow.prototype.filterConf = function (combo, mode) {
    var prefix = "quickconfwindow-";
    this.getFunctionFields().hide();
}

EQPWindow.prototype.setPravameter = function (reportid, prametername) {
    var prefix = "quickconfwindow-";

    switch (prametername) {
        case "Function":
            Ext.getCmp(prefix + 'getFunctionFields').show();
            break;
        default:
    }
}

EQPWindow.prototype.getFunctionFields = function () {
    return Ext.getCmp(this.prefix + 'FunctionFields');
}


/** [20140822] Thawatchai.T add setRecord to window popup 
*    syntax set value 
*    Ext.getCmp(UI ID).setvalue(value)
*/


EQPWindow.prototype.display = function (record) {
    var prefix = "quickconfwindow-";
    Ext.getCmp(prefix + "-EQPCode").readOnly = true;
    Ext.getCmp(prefix + "-EQPCode").setValue(record.data.EQPCode);
    Ext.getCmp(prefix + "-EQPDescription").setValue(record.data.EQPDescription);
}

EQPWindow.prototype.mapping = function (e, v) {
    var prefix = "quickconfwindow-";

    var reportid = record.data.id
}

EQPWindow.prototype.GetParameter = function (id) {

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

//                EQPWindow.prototype.setPravameter(pr.ReportID, pr.ParameterName);
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




