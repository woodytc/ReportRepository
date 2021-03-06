﻿Ext.define('DeviceCommunication.store.GeoFencesConfStore', {
    extend: 'Ext.data.Store',
    alias: 'widget.geofencesconfstore',
    model: 'DeviceCommunication.model.RequestAckCommand',
    autoLoad: true,
    pageSize: 500,
    proxy: {
        type: 'ajax',
        api: {
            read: 'Devices/GetRequestAckCommands'
        },
        timeout: 120000,
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'total',
            successProperty: 'success'
        }
    }
});