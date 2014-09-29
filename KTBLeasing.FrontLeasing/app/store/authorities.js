/*
 * File: app/store/authorities.js
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

Ext.define('TabUserInformation.store.authorities', {
    extend: 'Ext.data.Store',
    alias: 'store.authorities',

    requires: [
        'TabUserInformation.model.Authority',
        'Ext.data.proxy.Memory'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'authorities',
            model: 'TabUserInformation.model.Authority',
            data: [
                {
                    id: 450,
                    myField: 'eius'
                },
                {
                    id: 623,
                    myField: 'odit'
                },
                {
                    id: 946,
                    myField: 'molestiae'
                },
                {
                    id: 604,
                    myField: 'vel'
                },
                {
                    id: 673,
                    myField: 'eos'
                },
                {
                    id: 118,
                    myField: 'soluta'
                },
                {
                    id: 718,
                    myField: 'enim'
                },
                {
                    id: 208,
                    myField: 'aut'
                },
                {
                    id: 683,
                    myField: 'quisquam'
                },
                {
                    id: 729,
                    myField: 'veniam'
                },
                {
                    id: 557,
                    myField: 'repudiandae'
                },
                {
                    id: 799,
                    myField: 'iusto'
                },
                {
                    id: 278,
                    myField: 'reprehenderit'
                },
                {
                    id: 800,
                    myField: 'ut'
                },
                {
                    id: 413,
                    myField: 'et'
                },
                {
                    id: 636,
                    myField: 'id'
                },
                {
                    id: 936,
                    myField: 'eos'
                },
                {
                    id: 689,
                    myField: 'repellendus'
                },
                {
                    id: 88,
                    myField: 'et'
                },
                {
                    id: 859,
                    myField: 'consequuntur'
                },
                {
                    id: 701,
                    myField: 'magnam'
                },
                {
                    id: 711,
                    myField: 'quam'
                },
                {
                    id: 600,
                    myField: 'accusamus'
                },
                {
                    id: 873,
                    myField: 'rerum'
                },
                {
                    id: 123,
                    myField: 'ipsa'
                },
                {
                    id: 530,
                    myField: 'nulla'
                },
                {
                    id: 837,
                    myField: 'quam'
                },
                {
                    id: 495,
                    myField: 'nulla'
                },
                {
                    id: 914,
                    myField: 'tenetur'
                },
                {
                    id: 594,
                    myField: 'aut'
                }
            ],
            proxy: {
                type: 'memory'
            }
        }, cfg)]);
    }
});