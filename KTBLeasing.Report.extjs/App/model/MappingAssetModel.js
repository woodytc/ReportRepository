Ext.define('Report.model.MappingAssetModel', {
    extend: 'Ext.data.Model'
        , fields: [
           'ID',
           'EQPCode',
           'AssetID',
           'EQPDescription',
           'AssetType',
           'UpdateDate',
            'UpdateUser',
            'IsDelete'
        ],
    idProperty: 'ID'
});