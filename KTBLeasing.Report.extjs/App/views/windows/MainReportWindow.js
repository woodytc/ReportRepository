

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
                    { name: 'other', value: 'TowingConf' }
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



        /** ==============================================================  END Store ==============================*/
        //1
        var mainParameterFields = {
            title: "Information",
            xtype: 'fieldset',
            defaultType: 'textfield',

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
                { id: me.prefix + 'reportID', name: 'ReportID', fieldLabel: 'Type', hidden: true, readOnly: true }
                
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
                    //**cls:'x-border-box, x-border-box',**
                    id: 'todate',
                    padding: 5,
                    //width: 130,
                    //labelWidth: 30,
                    value: todate,
                    maxValue: today,
                    format: "d.m.Y",
                    layout: 'form',
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
				    //**cls:'x-border-box, x-border-box',**
				    //labelWidth: 50,
				    //width: 150,
				    name: 'EndDate',
				    padding: 5,
				    id: 'fromdate',
				    value: fromdate,
				    maxValue: today,
				    format: "d.m.Y",
				    layout: 'form',
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
            title: 'New Quick Deployment',
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
                items: [mainParameterFields, monthFields, cumulativeFields]
            }],
            buttons: [
            {
                iconCls: 'icon-save',
                text: 'Save',
                id: prefix + 'conf-button-save',
                handler: function (btn, evt) {
                    var form = me.down('form').getForm();
                    if (true) {
//                        form.submit({
//                            url: window.reportparam,
//                            timeout: 999999,
//                            params: {

//                        });

                        $.ajax({
                            type: "POST",
                            cache: false,
                            data: serial,
                            async: true,
                            url: window.reportparam,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (jqXHR.responseText) {
                                    var arrErr = jqXHR.responseText.split('p>');
                                    if (arrErr.length > 2)
                                        Ext.Msg.alert("Status", arrErr[1].substring(0, arrErr[1].length - 2));
                                }
                            }
                        });
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
});      // end Ext.define('MainReportWindow


MainReportWindow.prototype.filterConf = function (combo, mode) {
    var prefix = "quickconfwindow-";
    //Ext.getCmp(prefix + 'principle-type').setValue("Conf");
		
    this.getMonthFields().hide();
	this.getCumulativeFields().hide();
	
	switch (combo.getValue()) {
        case "month":
            this.getMonthFields().show();
            break;
		case "cumulative":
			this.getCumulativeFields().show();
		default:
	}
}

MainReportWindow.prototype.getMonthFields = function () {
    return Ext.getCmp(this.prefix + 'monthFields');
}

MainReportWindow.prototype.getCumulativeFields = function () {
    return Ext.getCmp(this.prefix + 'cumulativeFields');
}

/** [20140822] Thawatchai.T add setRecord to window popup 
*    syntax set value 
*    Ext.getCmp(UI ID).setvalue(value)
*/
MainReportWindow.prototype.display = function (record) {
    var prefix = "quickconfwindow-";
    console.log(record);

    var id = record.id;
    //call url service get data 
    //set data to panal
    //do not something
    //exe
    console.log("hello");
    console.log(id);
    MainReportWindow.prototype.GetParameter(id);
    if (true) {
        Ext.getCmp(prefix + 'parameter-type').setValue('cumulative');
        this.getCumulativeFields().show();
    }

}

MainReportWindow.prototype.mapping = function (e,v) {
    var prefix = "quickconfwindow-";
    console.log(record);
    var reportid = record.data.id
    
//    if (true) {
//        Ext.getCmp(prefix + 'parameter-type').setValue('cumulative');
//        this.getCumulativeFields().show();
//        this.getMonthFields().show();
//    }

}

MainReportWindow.prototype.GetParameter = function (id)
{
    Ext.Ajax.request({
        type: "GET",
        cache: false,
        //data: id,
        params:{
            id: id
        },
        async: true,
        url: window.getParameterreport,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            
            console.log(result);
            
            if (result.data.Success) {

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




