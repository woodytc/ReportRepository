Ext.define('DeviceCommunication.model.Device', {
    extend: 'Ext.data.Model',
    fields: ['Imei', 'IP', 'Firmware', 'Profile',
            { name: 'LatestAccessTime', type: 'date', dateFormat: 'MS' },
            { name: 'ServerID', type: 'int' },
            { name: 'CountMessages', type: 'int' },
            { name: 'VehicleState' },
            { name: 'Silent1State' },
            { name: 'ObdBlackoutState' },
            { name: 'MismatchVinState' },
            /* [20131111] Narin K. - Fix bug display all problem mode */
            { name: 'UnpluggedState' },
            { name: 'PowerLossState' },
            { name: 'MissingGpsState' },
            
            { name: 'ModeState' },
            { name: 'TcpHangingState' }, 'DeviceSn', 'ToDayCountMessages', 'ToDayInvalidChecksum','idMode'
        ],
    idProperty: 'Imei'
});