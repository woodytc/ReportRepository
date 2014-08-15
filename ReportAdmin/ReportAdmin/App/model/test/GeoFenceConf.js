Ext.define('DeviceCommunication.model.GeoFenceConf', {
    extend: 'Ext.data.Model',
    fields: ['Imei', 'SvC_No', 'SvElevation', 'SvAzimuth', 'SvC_No_Threshold'],
    idProperty: 'SvId'
});