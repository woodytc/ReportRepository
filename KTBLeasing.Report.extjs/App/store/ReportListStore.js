Ext.define('Report.store.ReportListStore', {
    extend: 'Ext.data.Store',
    alias: 'widget.reportliststore',
    model: 'Report.model.ReportModel',
    autoLoad: true,
    pageSize: 500,
    proxy: {
        type: 'ajax',
        api: {
            read: 'Home/GridReport'
        },
        timeout: 120000,
        reader: {
            type: 'json',
            root: 'items',
            totalProperty: 'total',
            successProperty: 'success'
        }
    }
});