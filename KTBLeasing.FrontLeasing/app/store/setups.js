/*
 * File: app/store/setups.js
 *
 * This file was generated by Sencha Architect version 3.1.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 5.0.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 5.0.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('TabUserInformation.store.setups', {
    extend: 'Ext.data.Store',
    alias: 'store.setups',

    requires: [
        'TabUserInformation.model.Setup',
        'Ext.data.proxy.Memory'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'setups',
            model: 'TabUserInformation.model.Setup',
            data: [
                {
                    id: 801,
                    myField: 'sit'
                },
                {
                    id: 993,
                    myField: 'vero'
                },
                {
                    id: 272,
                    myField: 'distinctio'
                },
                {
                    id: 494,
                    myField: 'voluptatem'
                },
                {
                    id: 322,
                    myField: 'ducimus'
                },
                {
                    id: 63,
                    myField: 'saepe'
                },
                {
                    id: 613,
                    myField: 'nam'
                },
                {
                    id: 662,
                    myField: 'provident'
                },
                {
                    id: 715,
                    myField: 'aperiam'
                },
                {
                    id: 556,
                    myField: 'consequatur'
                },
                {
                    id: 949,
                    myField: 'est'
                },
                {
                    id: 999,
                    myField: 'velit'
                },
                {
                    id: 112,
                    myField: 'sed'
                },
                {
                    id: 499,
                    myField: 'pariatur'
                },
                {
                    id: 736,
                    myField: 'ut'
                },
                {
                    id: 452,
                    myField: 'qui'
                },
                {
                    id: 604,
                    myField: 'sed'
                },
                {
                    id: 348,
                    myField: 'dolore'
                },
                {
                    id: 585,
                    myField: 'aut'
                },
                {
                    id: 162,
                    myField: 'minima'
                },
                {
                    id: 58,
                    myField: 'debitis'
                },
                {
                    id: 745,
                    myField: 'sed'
                },
                {
                    id: 659,
                    myField: 'id'
                },
                {
                    id: 604,
                    myField: 'facere'
                },
                {
                    id: 328,
                    myField: 'quis'
                },
                {
                    id: 658,
                    myField: 'beatae'
                },
                {
                    id: 944,
                    myField: 'rerum'
                },
                {
                    id: 906,
                    myField: 'dolorem'
                },
                {
                    id: 265,
                    myField: 'libero'
                },
                {
                    id: 362,
                    myField: 'sed'
                }
            ],
            proxy: {
                type: 'memory'
            }
        }, cfg)]);
    }
});