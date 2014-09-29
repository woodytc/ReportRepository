{
    "xdsVersion": "3.1.0",
    "frameworkVersion": "ext50",
    "internals": {
        "type": "Ext.panel.Panel",
        "reference": {
            "name": "items",
            "type": "array"
        },
        "codeClass": null,
        "userConfig": {
            "autoScroll": true,
            "container|align": "center",
            "container|pack": "center",
            "defaultAlign": null,
            "defaults": [
                "{ columns: 2 }"
            ],
            "designer|initialView": true,
            "designer|userAlias": "mypanel3",
            "designer|userClassName": "MyPanel3",
            "height": 123,
            "layout": "vbox",
            "title": "ค้นหา"
        },
        "name": "MyPanel3",
        "viewControllerInstanceId": "b41138cd-bcff-4df5-a6d3-b4abf7364011",
        "viewModelInstanceId": "92c5d2c3-821d-4677-b51d-6c4846a1b80f",
        "cn": [
            {
                "type": "Ext.form.field.Text",
                "reference": {
                    "name": "items",
                    "type": "array"
                },
                "codeClass": null,
                "userConfig": {
                    "defaultAlign": null,
                    "emptyText": "[ ค้นหาข้อมูล ]",
                    "fieldLabel": "ค้นหา",
                    "labelAlign": "right",
                    "layout|flex": 0,
                    "layout|margins": "10px 10px 10px 10px",
                    "width": 466
                },
                "name": "MyTextField"
            },
            {
                "type": "Ext.container.Container",
                "reference": {
                    "name": "items",
                    "type": "array"
                },
                "codeClass": null,
                "userConfig": {
                    "anchorSize": null,
                    "border": true,
                    "container|defaultMargins": [
                        "{\"top\":0,\"right\":0,\"bottom\":0,\"left\":5",
                        "}"
                    ],
                    "container|pack": "center",
                    "dock": null,
                    "height": 30,
                    "layout": "hbox",
                    "layout|flex": 0,
                    "layout|margins": null,
                    "margin": null,
                    "width": 483
                },
                "name": "MyContainer1",
                "cn": [
                    {
                        "type": "Ext.button.Button",
                        "reference": {
                            "name": "items",
                            "type": "array"
                        },
                        "codeClass": null,
                        "userConfig": {
                            "border": null,
                            "iconCls": null,
                            "text": "ค้นหา",
                            "textAlign": null,
                            "width": null
                        },
                        "name": "MyButton"
                    },
                    {
                        "type": "Ext.button.Button",
                        "reference": {
                            "name": "items",
                            "type": "array"
                        },
                        "codeClass": null,
                        "userConfig": {
                            "text": "ล้าง",
                            "width": null
                        },
                        "name": "MyButton1"
                    }
                ]
            }
        ]
    },
    "linkedNodes": {},
    "boundStores": {},
    "boundModels": {}
}