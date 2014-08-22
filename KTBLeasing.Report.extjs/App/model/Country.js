function formatDecimals(v, record) {
    if (record.get('capital') == "") {
        return "";
    }
    else {
        return (new Number(v)).toFixed(2);
    }
}

function formatDecimals2(v, record) {
    return (new Number(v)).toFixed(2);
}

Ext.define('MYTREE.model.Country', {
    extend: 'Ext.data.Model',
    fields: [
            { name: 'id', type: 'string' },
            { name: 'text', type: 'string' },
            { name: 'surfaceArea', convert: formatDecimals2 },
            { name: 'population', convert: formatDecimals2 },
            { name: 'lifeExpectancy', convert: formatDecimals },
            { name: 'gnp', convert: formatDecimals },
            { name: 'capital', type: 'string' },
            { name: 'code', type: 'string' }
        ]
});

