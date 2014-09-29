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
            "designer|initialView": true,
            "designer|userAlias": "userinftab",
            "designer|userClassName": "UserInfTab",
            "height": null,
            "width": "100%"
        },
        "name": "MyPanel1",
        "viewControllerInstanceId": "617b51ee-7101-4768-8554-cd05958c4bee",
        "viewModelInstanceId": "fef0e0af-9b23-45bf-9b37-88d304b10ef5",
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
                            "width": "100%"
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
                                    "boxLabel": "Order By Code",
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
                                    "boxLabel": "Order by Name",
                                    "fieldLabel": null,
                                    "margin": "0 0 0 5"
                                },
                                "name": "MyRadio1"
                            }
                        ]
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
                    "title": "User Information"
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
                            "height": 500
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
                            "fieldLabel": "Address",
                            "layout|anchor": null,
                            "width": 500
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
                            "fieldLabel": "Telephone",
                            "inputType": "tel",
                            "layout|anchor": null,
                            "width": null
                        },
                        "name": "MyTextField2"
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
                            "layout|anchor": null
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
                            "fieldLabel": "Email",
                            "inputType": "email",
                            "layout|anchor": null,
                            "modelValidation": null,
                            "width": 400
                        },
                        "name": "MyTextField4"
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
                            "text": "New"
                        },
                        "name": "MyButton2",
                        "cn": [
                            {
                                "type": "viewcontrollereventbinding",
                                "reference": {
                                    "name": "listeners",
                                    "type": "array"
                                },
                                "codeClass": null,
                                "userConfig": {
                                    "fn": "onButtonNewClick",
                                    "implHandler": [
                                        "// Create new register form window",
                                        "var popup = Ext.create(\"widget.userinfwindow\");",
                                        "// Show window",
                                        "popup.show();"
                                    ],
                                    "name": "click",
                                    "scope": "me"
                                },
                                "name": "onButtonNewClick"
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