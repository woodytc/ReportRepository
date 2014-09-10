Ext.define('AssetTypeModel', {
    extend: 'Ext.data.Model',
    fields: [
            'ID',
            'AssetType',
            'Active',
            'CreateDate',
			'UpdateDate'
        ],
    idProperty: 'ID'
});