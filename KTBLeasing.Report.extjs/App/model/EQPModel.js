Ext.define('EQPModel', {
    extend: 'Ext.data.Model',
    fields: [
            'EQPCode',
            'ComID',
			'EQPDescription'
        ],
    idProperty: 'EQPCode'
});