Ext.define('MYTREE.controller.Countries', {
    extend: 'Ext.app.Controller',

    //define the stores
    stores: ['Countries'],
    //define the models
    models: ['Country'],
    //define the views
    views: ['CountryTree', 'EditMenu', 'AddMenu', 'CountryEdit'],
    refs: [{
        //reference to the country Tree
        ref: 'myCountryTree',
        selector: 'countryTree'
    }, {
        //reference to the country window
        ref: 'myCountryWindow',
        selector: 'countryEdit'
    }],

    init: function () {
        this.control({

            'viewport': {
                render: this.onPanelRendered
            },
            //Tree events - click, checkbox change, node expand and right click
            'countryTree': {
                itemclick: this.treeItemClick,
                checkchange: this.treeCheckChange,
                itemexpand: this.treeNodeExpand,
                itemcontextmenu: this.treeRightClick
            },
            //get all checked noded button
            'countryTree button[action=getCheckedNodes]': {
                click: this.getAllCheckedNodes
            },
            //edit a country
            'editMenu menuitem[text=Edit]': {
                click: this.editCountry
            },
            //delete a country
            'editMenu menuitem[text=Delete]': {
                click: this.deleteCountry
            },
            //add a country 
            'addMenu menuitem[text=Add]': {
                click: this.addCountry
            },
            //save country info from the edit window
            'countryEdit button[action=save]': {
                click: this.saveCountry
            }
        });
    },

    onPanelRendered: function () {
        //just a console log to show when the panel is rendered
        console.log('The panel was rendered');
    },

    treeItemClick: function (view, record) {
        //some node in the tree was clicked
        //you have now access to the node record and the tree view
        console.log('Clicked on a Tree Node!\n' + 'Node id: '
                        + record.get('id') + '\n' + 'Node Text: '
                        + record.get('text') + '\n' + 'Parent Node id: '
                        + record.get('parentId') + '\n' + 'Is it a leaf?: '
                        + record.get('leaf') + '\n' + 'No of Children: '
                        + record.childNodes.length);
        //now you have all the information about the node
        //Node id
        //Node Text
        //Parent Node
        //Is the node a leaf?
        //No of child nodes
        //......................
        //go do some real world processing
    },

    //event triggred when a node is checked or unchecked
    treeCheckChange: function (node, checked) {
        console.log('Checkbox clicked: Is it checked? ' + checked);
        console.log('Is the node loaded? ' + node.isLoaded());
        //loops thru all child nodes and check or uncheck 
        //based on the parent node that was clicked
        node.eachChild(function (childNode) {
            childNode.set('checked', checked);
            //keep going
            this.treeCheckChange(childNode, checked);
        }, this);
    },

    //node expand event 
    treeNodeExpand: function (node) {
        console.log('Expanded Node: How many children? '
                        + node.childNodes.length);
    },

    //get all nodes that are checked in the Tree panel
    getAllCheckedNodes: function (button) {
        selectedNodes = this.getMyCountryTree().getChecked();
        console.log('List of Selected Nodes:\n');
        Ext.Array.each(selectedNodes, function (record) {
            console.log('Node:' + record.get('id') + ' Text:'
                                    + record.get('text') + '\n');
        });
    },

    //display the context menu
    treeRightClick: function (view, record, item, index, e) {
        //stop the default action
        e.stopEvent();
        //save the current selected record
        this.application.currentRecord = record;
        //if the node is a region let user add a country
        if (record.get('depth') === 2) {
            addMenu = Ext.widget('addMenu');
            addMenu.showAt(e.getXY());
        }
        //if the node is country let the user edit or delete
        if (record.get('depth') === 3) {
            editMenu = Ext.widget('editMenu');
            editMenu.showAt(e.getXY());
        }
        return false;
    },

    //edit the country
    editCountry: function (item, e) {
        console.log(this.application.currentRecord);
        //get reference to the window for editing
        countryWindow = this.getMyCountryWindow();
        //create the window for editing if it doesn't exist
        if (!countryWindow) {
            countryWindow = Ext.widget('countryEdit');
        }
        //load the record into the form
        countryWindow.down('form').loadRecord(this.application.currentRecord);
        //get the Country code field in the form and protect it
        countryWindow.down('form').getComponent('code').setReadOnly(true);
        //set the parent node id in the hidden field
        countryWindow.down('form').getComponent('parentNodeId')
                        .setValue(this.application.currentRecord.parentNode.get('id'));
        //display the window       
        countryWindow.show();
    },

    addCountry: function (item, e) {
        console.log(this.application.currentRecord);
        //get reference to the window for editing
        countryWindow = this.getMyCountryWindow();
        //create the window for editing if it doesn't exist
        if (!countryWindow) {
            countryWindow = Ext.widget('countryEdit');
        }
        //set to Add mode
        countryWindow.addMode = true;
        //load blank record into the form
        blankCountry = new MYTREE.model.Country();
        countryWindow.down('form').loadRecord(blankCountry);
        //get the Country code field in the form and unprotect it
        countryWindow.down('form').getComponent('code').setReadOnly(false);
        //set the current node as parent node id in the hidden field
        countryWindow.down('form').getComponent('parentNodeId')
                        .setValue(this.application.currentRecord.get('id'));
        countryWindow.down('form').getComponent('lifeExpectancy').setValue(0);
        countryWindow.down('form').getComponent('gnp').setValue(0);
        //display the window
        countryWindow.show();
    },

    //delete a country
    deleteCountry: function (item, e) {
        console.log(this.application.currentRecord);
        //set action as delete
        type = 'delete';
        //node is the parent node id
        node = this.application.currentRecord.parentNode.get('id');
        //data is the current node id
        data = this.application.currentRecord.get('id');
        //send the request to the server
        this.sendMyRequest(type, node, data);
    },

    //save the country information from the editing window
    saveCountry: function (button) {
        //get access to the window using the button reference
        var win = button.up('window');
        //get access to the form using the window reference
        form = win.down('form');

        //check if the form passed all validations
        if (form.getForm().isValid()) {
            //if there are no errors then send the Add request to server
            countryWindow = this.getMyCountryWindow();
            //set the action based on window mode
            if (countryWindow.addMode) {
                type = 'add';
            }
            else {
                type = 'edit';
            }
            //get parent node from the hidden field
            node = form.getComponent('parentNodeId').getValue();
            //encode the form values to a JSON object
            data = Ext.encode(form.getValues());
            //send the request to server
            this.sendMyRequest(type, node, data);
            //close the window
            win.close();
        }
    },

    //sending the add, edit and delete transactions to server
    sendMyRequest: function (type, node, data) {

        //create an AJAX request
        Ext.Ajax.request({
            url: 'CountryServlet',
            params: {
                action: type,
                parentNodeId: node,
                myData: data
            },
            scope: this,
            //method to call when the request is successful
            success: this.onSaveSuccess,
            //method to call when the request is a failure
            failure: this.onSaveFailure
        });

    },

    onSaveFailure: function (err) {
        //Alert the user about communication error
        Ext.MessageBox.alert('Status', 'Error occured during Item Add');
    },

    onSaveSuccess: function (response, opts) {
        //Alert the user about communication error
        if (opts.params.action === 'edit') {
            Ext.MessageBox.alert('Status', 'Country Updated!');
        }
        if (opts.params.action === 'add') {
            Ext.MessageBox.alert('Status', 'Country Added!');
        }
        if (opts.params.action === 'delete') {
            Ext.MessageBox.alert('Status', 'Country Deleted!');
        }
        //get refernce to the node that needs to be reloaded to match data with the server
        refreshNode = this.getCountriesStore().getNodeById(opts.params.parentNodeId);
        //unnecessary but required here due to an ExtJS bug
        refreshNode.removeAll(false);
        //refresh(reload) the node 
        this.getCountriesStore().load({
            node: refreshNode
        });
    }

});