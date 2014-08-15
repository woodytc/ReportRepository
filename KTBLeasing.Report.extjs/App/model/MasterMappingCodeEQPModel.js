Ext.define('MasterMappingCodeEQPModel', {
    extend: 'Ext.data.Model',
        fields: [
            'EQPCode',
			'ComID',
			'EQPDescription',
			'AssetCode'
        ],
        idProperty: 'EQPCode'
});