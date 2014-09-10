Ext.define('Report.model.ReportModel', {
    extend: 'Ext.data.Model'
        , fields: [
           { name: 'Id', type: 'int' },
           'Reportname',
           'Reportfilename',
           'Path',
           'Createby',
           'Createdate',
           'Updateby',
           'Updatedate'
        ]
});