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
            "bodyPadding": null,
            "designer|userAlias": "cusinftab",
            "designer|userClassName": "CusInfTab",
            "height": null,
            "title": "Customer-Information",
            "width": "100%"
        },
        "name": "UserInfTab1",
        "viewControllerInstanceId": "339c9b6d-92d5-4314-a085-7131621afccf",
        "viewModelInstanceId": "68402060-db39-4015-b43d-a9040d78e4b1",
        "cn": [
            {
                "type": "Ext.panel.Panel",
                "reference": {
                    "name": "items",
                    "type": "array"
                },
                "codeClass": null,
                "userConfig": {
                    "bodyPadding": "",
                    "container|align": "middle",
                    "height": 84,
                    "layout": "hbox",
                    "margin": null,
                    "title": "ค้นหา"
                },
                "name": "MyPanel",
                "cn": [
                    {
                        "type": "Ext.form.field.Text",
                        "reference": {
                            "name": "items",
                            "type": "array"
                        },
                        "codeClass": null,
                        "userConfig": {
                            "fieldLabel": "Search Text",
                            "labelAlign": "right"
                        },
                        "name": "MyTextField"
                    },
                    {
                        "type": "Ext.button.Button",
                        "reference": {
                            "name": "items",
                            "type": "array"
                        },
                        "codeClass": null,
                        "userConfig": {
                            "layout|margins": null,
                            "margin": "0 0 0 5",
                            "text": "Search"
                        },
                        "name": "MyButton",
                        "cn": [
                            {
                                "type": "viewcontrollereventbinding",
                                "reference": {
                                    "name": "listeners",
                                    "type": "array"
                                },
                                "codeClass": null,
                                "userConfig": {
                                    "fn": "onButtonClick",
                                    "implHandler": [
                                        ""
                                    ],
                                    "name": "click",
                                    "scope": "me"
                                },
                                "name": "onButtonClick"
                            }
                        ]
                    },
                    {
                        "type": "Ext.form.RadioGroup",
                        "reference": {
                            "name": "items",
                            "type": "array"
                        },
                        "codeClass": null,
                        "userConfig": {
                            "container|autoFlex": false,
                            "dock": null,
                            "fieldLabel": null,
                            "layout|flex": null,
                            "layout|margins": null,
                            "margin": null,
                            "width": 300
                        },
                        "name": "MyRadioGroup",
                        "cn": [
                            {
                                "type": "Ext.form.field.Radio",
                                "reference": {
                                    "name": "items",
                                    "type": "array"
                                },
                                "codeClass": null,
                                "userConfig": {
                                    "boxLabel": "Code",
                                    "fieldLabel": null
                                },
                                "name": "MyRadio"
                            },
                            {
                                "type": "Ext.form.field.Radio",
                                "reference": {
                                    "name": "items",
                                    "type": "array"
                                },
                                "codeClass": null,
                                "userConfig": {
                                    "boxLabel": "English Name",
                                    "fieldLabel": null,
                                    "margin": "0 0 0 5"
                                },
                                "name": "MyRadio1"
                            },
                            {
                                "type": "Ext.form.field.Radio",
                                "reference": {
                                    "name": "items",
                                    "type": "array"
                                },
                                "codeClass": null,
                                "userConfig": {
                                    "boxLabel": "Thai Name",
                                    "fieldLabel": null,
                                    "margin": "0 0 0 5"
                                },
                                "name": "MyRadio2"
                            }
                        ]
                    },
                    {
                        "type": "Ext.form.field.Checkbox",
                        "reference": {
                            "name": "items",
                            "type": "array"
                        },
                        "codeClass": null,
                        "userConfig": {
                            "boxLabel": "Partial",
                            "fieldLabel": null,
                            "layout|flex": 0
                        },
                        "name": "MyCheckbox1"
                    }
                ]
            },
            {
                "type": "Ext.grid.Panel",
                "reference": {
                    "name": "items",
                    "type": "array"
                },
                "codeClass": null,
                "userConfig": {
                    "autoScroll": true,
                    "title": "Customer Information"
                },
                "name": "MyGridPanel",
                "cn": [
                    {
                        "type": "Ext.grid.column.Column",
                        "reference": {
                            "name": "columns",
                            "type": "array"
                        },
                        "codeClass": null,
                        "userConfig": {
                            "dataIndex": "string",
                            "text": "String"
                        },
                        "name": "MyColumn"
                    },
                    {
                        "type": "Ext.grid.column.Number",
                        "reference": {
                            "name": "columns",
                            "type": "array"
                        },
                        "codeClass": null,
                        "userConfig": {
                            "dataIndex": "number",
                            "text": "Number"
                        },
                        "name": "MyNumberColumn"
                    },
                    {
                        "type": "Ext.grid.column.Date",
                        "reference": {
                            "name": "columns",
                            "type": "array"
                        },
                        "codeClass": null,
                        "userConfig": {
                            "dataIndex": "date",
                            "text": "Date"
                        },
                        "name": "MyDateColumn"
                    },
                    {
                        "type": "Ext.grid.column.Boolean",
                        "reference": {
                            "name": "columns",
                            "type": "array"
                        },
                        "codeClass": null,
                        "userConfig": {
                            "dataIndex": "bool",
                            "text": "Boolean"
                        },
                        "name": "MyBooleanColumn"
                    },
                    {
                        "type": "Ext.grid.View",
                        "reference": {
                            "name": "viewConfig",
                            "type": "object"
                        },
                        "codeClass": null,
                        "userConfig": {
                            "height": 400
                        },
                        "name": "MyGridView"
                    }
                ]
            },
            {
                "type": "Ext.form.Panel",
                "reference": {
                    "name": "items",
                    "type": "array"
                },
                "codeClass": null,
                "userConfig": {
                    "bodyPadding": 10,
                    "height": 214,
                    "title": null,
                    "waitTitle": ""
                },
                "name": "MyForm",
                "cn": [
                    {
                        "type": "Ext.form.field.Text",
                        "reference": {
                            "name": "items",
                            "type": "array"
                        },
                        "codeClass": null,
                        "userConfig": {
                            "fieldLabel": "Industry Code",
                            "layout|anchor": null,
                            "width": null
                        },
                        "name": "MyTextField1"
                    },
                    {
                        "type": "Ext.form.field.Text",
                        "reference": {
                            "name": "items",
                            "type": "array"
                        },
                        "codeClass": null,
                        "userConfig": {
                            "fieldLabel": "Nature of Cust",
                            "layout|anchor": null,
                            "width": null
                        },
                        "name": "MyTextField5"
                    },
                    {
                        "type": "Ext.form.field.Text",
                        "reference": {
                            "name": "items",
                            "type": "array"
                        },
                        "codeClass": null,
                        "userConfig": {
                            "fieldLabel": "Group of Cust",
                            "layout|anchor": null,
                            "width": null
                        },
                        "name": "MyTextField12"
                    },
                    {
                        "type": "Ext.container.Container",
                        "reference": {
                            "name": "items",
                            "type": "array"
                        },
                        "codeClass": null,
                        "userConfig": {
                            "height": 30,
                            "layout": "column"
                        },
                        "name": "MyContainer4",
                        "cn": [
                            {
                                "type": "Ext.form.field.Text",
                                "reference": {
                                    "name": "items",
                                    "type": "array"
                                },
                                "codeClass": null,
                                "userConfig": {
                                    "fieldLabel": "Telephone"
                                },
                                "name": "MyTextField3"
                            },
                            {
                                "type": "Ext.form.field.Text",
                                "reference": {
                                    "name": "items",
                                    "type": "array"
                                },
                                "codeClass": null,
                                "userConfig": {
                                    "fieldLabel": "Fax",
                                    "labelAlign": "right",
                                    "labelWidth": 50,
                                    "margin": null
                                },
                                "name": "MyTextField14"
                            }
                        ]
                    },
                    {
                        "type": "Ext.form.field.Text",
                        "reference": {
                            "name": "items",
                            "type": "array"
                        },
                        "codeClass": null,
                        "userConfig": {
                            "fieldLabel": "Email Address",
                            "height": null,
                            "inputType": "email",
                            "layout|anchor": null,
                            "modelValidation": null,
                            "width": 400
                        },
                        "name": "MyTextField4"
                    },
                    {
                        "type": "Ext.form.field.Text",
                        "reference": {
                            "name": "items",
                            "type": "array"
                        },
                        "codeClass": null,
                        "userConfig": {
                            "fieldLabel": "Warning",
                            "layout|anchor": null,
                            "width": null
                        },
                        "name": "MyTextField13"
                    },
                    {
                        "type": "Ext.form.field.Text",
                        "reference": {
                            "name": "items",
                            "type": "array"
                        },
                        "codeClass": null,
                        "userConfig": {
                            "fieldLabel": "Status",
                            "layout|anchor": null,
                            "width": null
                        },
                        "name": "MyTextField15"
                    },
                    {
                        "type": "Ext.form.field.Text",
                        "reference": {
                            "name": "items",
                            "type": "array"
                        },
                        "codeClass": null,
                        "userConfig": {
                            "fieldLabel": "Inactive Reason",
                            "layout|anchor": null,
                            "width": null
                        },
                        "name": "MyTextField16"
                    }
                ]
            },
            {
                "type": "Ext.toolbar.Toolbar",
                "reference": {
                    "name": "dockedItems",
                    "type": "array"
                },
                "codeClass": null,
                "userConfig": {
                    "dock": "bottom"
                },
                "name": "MyToolbar",
                "cn": [
                    {
                        "type": "Ext.button.Button",
                        "reference": {
                            "name": "items",
                            "type": "array"
                        },
                        "codeClass": null,
                        "userConfig": {
                            "layout|flex": null,
                            "text": "Exit"
                        },
                        "name": "MyButton1",
                        "cn": [
                            {
                                "type": "viewcontrollereventbinding",
                                "reference": {
                                    "name": "listeners",
                                    "type": "array"
                                },
                                "codeClass": null,
                                "userConfig": {
                                    "designer|params": [
                                        "button"
                                    ],
                                    "fn": "onButtonExit1",
                                    "name": "exit",
                                    "scope": "me"
                                },
                                "name": "onButtonExit1"
                            }
                        ]
                    },
                    {
                        "type": "Ext.button.Button",
                        "reference": {
                            "name": "items",
                            "type": "array"
                        },
                        "codeClass": null,
                        "userConfig": {
                            "layout|flex": null,
                            "text": "Edit"
                        },
                        "name": "MyButton3",
                        "cn": [
                            {
                                "type": "viewcontrollereventbinding",
                                "reference": {
                                    "name": "listeners",
                                    "type": "array"
                                },
                                "codeClass": null,
                                "userConfig": {
                                    "fn": "onButtonEditClick",
                                    "implHandler": [
                                        "// Create new register form window",
                                        "var popup = Ext.create(\"widget.userinfwindow\");",
                                        "// Show window",
                                        "popup.show();"
                                    ],
                                    "name": "click",
                                    "scope": "me"
                                },
                                "name": "onButtonEditClick"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    "linkedNodes": {},
    "boundStores": {},
    "boundModels": {}
}