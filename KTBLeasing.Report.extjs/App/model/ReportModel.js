Ext.define('Report.model.ReportModel', {
    extend: 'Ext.data.Model'
        , fields: [
           'Id',
           'Reportname',
           'Reportfilename',
           'Path',
           'Createby',
           'Createdate',
           'Updateby',
           'Updatedate'
        ]
});