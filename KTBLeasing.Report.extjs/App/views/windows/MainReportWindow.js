

Ext.define('MainReportWindow', {
    extend: 'Ext.Window',
    initComponent: function () {
        var me = this;
        var prefix = "quickconfwindow-";
        me.prefix = prefix;
        me.items = [];

        var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';

        //list parameter
        /** STORE  */
        me.configTypeStore = Ext.create('Ext.data.Store', {
            fields: ['name', 'value'],
            data: [
                    { name: 'รายเดือน', value: 'month' },
                    { name: 'สะสม', value: 'cumulative' },
                    { name: 'TR', value: 'TR' }
                ]
        });

        me.paralistTypeStore = Ext.create('Ext.data.Store', {
            id: me.prefix + 'teststore',
            fields: ['name', 'value']
        });

        me.trStore = Ext.create('Ext.data.Store', {
            fields: ['name', 'value'],
            data: [
                    { name: 'T', value: 'T' },
                    { name: 'R', value: 'R' },
                    { name: 'not tr', value: '' }
                ]
        });

        me.monthStore = Ext.create('Ext.data.Store', {
            fields: ['name', 'value'],
            data: [
                    { name: 'กรุณาเลือก', value: '-1' },
					{ name: 'มกราคม', value: '1' },
					{ name: 'กุมภาพันธ์', value: '2' },
					{ name: 'มีนาคม', value: '3' },
					{ name: 'เมษายน', value: '4' },
					{ name: 'พฤษภาคม', value: '5' },
					{ name: 'มิถุนายน', value: '6' },
					{ name: 'กรกฎาคม', value: '7' },
					{ name: 'สิงหาคม', value: '8' },
					{ name: 'กันยายน', value: '9' },
					{ name: 'ตุลาคม', value: '10' },
					{ name: 'พฤศจิกายน', value: '11' },
					{ name: 'ธันวาคม', value: '12' }
                ]
        });

        var examlibstore = Ext.create('Ext.data.TreeStore', {
            proxy: {
                type: 'ajax',
                //url: "Authority/GetAuthority",
                url: window.treedata//,

                //                actionMethods: 'post'
            },
            sorters: [{
                property: 'leaf',
                direction: 'ASC'
            }, {
                property: 'text',
                direction: 'ASC'
            }]
        });

        me.agrStatusStore = Ext.create('Ext.data.Store', {
            autoLoad: true,
            fields: ['AgrStatus', 'Name'],
            proxy: {
                type: 'ajax',
                api: { read: window.getAgrStatus },
                reader: {
                    type: 'json',
                    root: 'items',
                    totalProperty: 'total'
                }
            }
        });

        /** ==============================================================  END Store ==============================*/
        //1
        var mainParameterFields = {
            title: "Information",
            xtype: 'fieldset',
            defaultType: 'textfield',
            hidden: true,
            layout: { type: 'table', columns: 2 },
            defaults: { style: 'margin:2px 5px;', labelWidth: 170 },
            items: [
                { id: me.prefix + 'parameter-type', name: 'ConfigurationType', xtype: 'combo', mode: 'local', editable: false, width: 600
                    , fieldLabel: 'Parameter Type', displayField: 'name', valueField: 'value', queryMode: 'local', anchor: '-10'
                    , value: '', emptyText: '------ Please select ------', allowBlank: false
                    , store: me.configTypeStore, colspan: 2
                    , listeners: {
                        'select': function (combo, records, eOpts) {
                            me.filterConf(combo, "Creating");
                        } // end select
                    } // end listeners
                },
                { id: me.prefix + 'reportID', name: 'ReportID', fieldLabel: 'ReportID', hidden: true, readOnly: true },
                { id: me.prefix + 'parameterName', name: 'ParameterName', fieldLabel: 'ParameterName', hidden: true, readOnly: true },
                { id: me.prefix + 'ReportName', name: 'ReportName', fieldLabel: 'ReportName', hidden: true, readOnly: true }

            ]
        };


        /**Display Parameter*/
        var monthFields = {
            title: 'month',
            hidden: true,
            id: me.prefix + 'monthFields',
            xtype: 'fieldset',
            defaultType: 'textfield',
            layout: { type: 'table', columns: 1 },
            defaults: { style: 'margin:2px 5px;', labelWidth: 170, fieldStyle: 'text-align: right;' },
            items: [
                { id: prefix + 'month', name: 'month', xtype: 'combo', mode: 'local', editable: false, displayField: 'name', valueField: 'value'
                        , queryMode: 'local', allowBlank: false, emptyText: 'selected'
                    , store: me.monthStore,
                    fieldLabel: 'Month', afterLabelTextTpl: required, labelStyle: 'text-align: right', width: 500
                },
				{ id: prefix + 'month', name: 'month', xtype: 'datefield' }
            ]
        };

        var trFields = {
            title: 'TR',
            hidden: true,
            id: me.prefix + 'trFields',
            xtype: 'fieldset',
            defaultType: 'textfield',
            layout: { type: 'table', columns: 1 },
            defaults: { style: 'margin:2px 5px;', labelWidth: 170, fieldStyle: 'text-align: right;' },
            items: [
                    { id: prefix + 'TR', name: 'TR', xtype: 'combo', mode: 'local', editable: false, displayField: 'name', valueField: 'value'
                            , queryMode: 'local', allowBlank: false, emptyText: 'selected'
                        , store: me.trStore,
                        fieldLabel: 'TR', afterLabelTextTpl: required, labelStyle: 'text-align: right', width: 500
                    }
                ]
        };
        var agrStatusFields = {
            title: 'Agr Status',
            hidden: true,
            id: me.prefix + 'agrStatusFields',
            xtype: 'fieldset',
            defaultType: 'textfield',
            layout: { type: 'table', columns: 1 },
            defaults: { style: 'margin:2px 5px;', labelWidth: 170, fieldStyle: 'text-align: right;' },
            items: [
                { id: prefix + 'AgrStatus', name: 'AgrStatus', xtype: 'combo', mode: 'local', editable: false, displayField: 'Name', valueField: 'AgrStatus'
                        , queryMode: 'local', allowBlank: false, emptyText: 'selected'
                    , store: me.agrStatusStore,
                    fieldLabel: 'AgrStatus', afterLabelTextTpl: required, labelStyle: 'text-align: right', width: 500
                }
            ]
        };
        /** Date between */
        var todate = '';
        var today = '';
        var fromdate = '';
        var cumulativeFields = {
            title: 'cumulative',
            hidden: true,
            id: me.prefix + 'cumulativeFields',
            xtype: 'fieldset',
            defaultType: 'textfield',
            layout: { type: 'table', columns: 2 },
            defaults: { style: 'margin:2px 5px;', labelWidth: 170, fieldStyle: 'text-align: right;' },
            items: [
                {
                    xtype: 'datefield',
                    fieldLabel: 'Start Date',
                    name: 'StartDate',
                    style: 'float: right',
                    afterLabelTextTpl: required, labelStyle: 'text-align: right',
                    id: me.prefix + 'StartDate',
                    padding: 5,
                    //width: 130,
                    //labelWidth: 30,
                    value: todate,
                    maxValue: today,
                    format: "d-m-Y",
                    layout: 'form',
                    allowBlank: false,
                    listeners: {
                        select: function (combo, value) {
                            todate = value;

                        }
                    }
                },
				{
				    xtype: 'datefield',

				    fieldLabel: 'End Date',
				    style: 'float: right',
				    afterLabelTextTpl: required, labelStyle: 'text-align: right',
				    //labelWidth: 50,
				    //width: 150,
				    name: 'EndDate',
				    padding: 5,
				    id: me.prefix + 'EndDate',
				    value: fromdate,
				    maxValue: today,
				    format: "d-m-Y",
				    layout: 'form',
                    allowBlank: false,
				    listeners: {
				        select: function (combo, value) {
				            fromdate = value;
				        }
				    }

				}
            ]
        };



        //Display
        Ext.apply(me, {
            iconCls: 'icon-details',
            title: 'Report Parameter',
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
                items: [mainParameterFields, monthFields, cumulativeFields, trFields, agrStatusFields]
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
                    var isvalid = me.isValid();

                    if (isvalid) {

                        Ext.each(Ext.decode(Ext.getCmp('quickconfwindow-parameterName').getValue()), function (pr) {
                            dictionaryarr.push({ name: pr.name, value: Ext.getCmp(me.prefix + pr.name).getValue() });
                        });

                        var ReportName = Ext.getCmp(me.prefix + 'ReportName').getValue();
                        var paralist = { ReportName: ReportName, Parameter: dictionary }

                        Ext.Ajax.request({
                            type: "POST",
                            cache: false,
                            params: {
                                reportname: Ext.encode(ReportName),
                                paralist: Ext.encode(dictionaryarr)
                            },
                            async: true,
                            url: window.reportparam,
                            success: function (result) {
                                var data = Ext.decode(result.responseText);
                                console.log(data.url);
                                window.open(data.url);
                            }, //success
                            failure: function (result) {

                            },
                            contentType: "application/json; charset=utf-8",
                            dataType: "json"
                        });

                        me.close();
                    } else {
                        Ext.MessageBox.alert('Data is valids!!',"Please Check input data");
                    }
                   
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
        MainReportWindow.superclass.initComponent.apply(me, arguments);
    } // end initComponent
});

MainReportWindow.prototype.isValid = function () {
    var prefix = this.prefix;

    var startdate = Ext.getCmp(prefix + 'StartDate').getValue()
    var enddate = Ext.getCmp(prefix + 'EndDate').getValue()
    
    var form = Ext.getCmp(prefix + 'form-info');
    for (var i = 0; i < form.items.length; i++) {
        for (var j = 0; j < form.items.items[i].items.length; j++) {
            if (form.items.items[i].hidden == false) {
                var component = form.items.items[i].items.items[j];
                if (component.xtype != "button") {
                    if (startdate > enddate) return false;
                    var vld = component.isValid();
                    if (!vld) {
                        return vld;
                    }
                }
            }
        }
    }
    return true;
}


MainReportWindow.prototype.filterConf = function (combo, mode) {
    var prefix = "quickconfwindow-";
    this.getMonthFields().hide();
    this.getCumulativeFields().hide();
    this.getTRFields().hide();
    this.getAgrStatusFields().hide();
}

MainReportWindow.prototype.setPravameter = function (reportid, prametername) {
    var prefix = "quickconfwindow-";
   
    switch (prametername) {
        case "StartDate":
            Ext.getCmp(prefix + 'reportID').setValue(reportid);
            Ext.getCmp(prefix + 'cumulativeFields').show();
            break;
        case "TR":
            Ext.getCmp(prefix + 'trFields').show();
            break;
        case "AgrStatus":
            Ext.getCmp(prefix + 'agrStatusFields').show();
            break;
        default:
    }
}

MainReportWindow.prototype.getMonthFields = function () {
    return Ext.getCmp(this.prefix + 'monthFields');
}

MainReportWindow.prototype.getCumulativeFields = function () {
    return Ext.getCmp(this.prefix + 'cumulativeFields');
}

MainReportWindow.prototype.getTRFields = function () {
    return Ext.getCmp(this.prefix + 'trFields');
}

MainReportWindow.prototype.getAgrStatusFields = function () {
    return Ext.getCmp(this.prefix + 'agrStatusFields');
}


/** [20140822] Thawatchai.T add setRecord to window popup 
*    syntax set value 
*    Ext.getCmp(UI ID).setvalue(value)
*/
MainReportWindow.prototype.display = function (record) {
    var prefix = "quickconfwindow-";
    Ext.getCmp(prefix + "ReportName").setValue(record.data.Reportfilename);
    MainReportWindow.prototype.GetParameter(record.data.Id);
    if (true) {
        Ext.getCmp(prefix + 'parameter-type').setValue('cumulative');
        this.getCumulativeFields().show();
    }

}

MainReportWindow.prototype.mapping = function (e,v) {
    var prefix = "quickconfwindow-";
    
    var reportid = record.data.id
}

MainReportWindow.prototype.GetParameter = function (id) {

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
               
                MainReportWindow.prototype.setPravameter(pr.ReportID, pr.ParameterName);
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




