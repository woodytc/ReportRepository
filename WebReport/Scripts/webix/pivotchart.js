/*
This software is allowed to use under GPL or you need to obtain Commercial or Enterprise License 
 to use it in non-GPL project. Please contact sales@webix.com for details
*/
webix.i18n.pivot = {
	apply: "Apply",
	bar: "Bar",
	cancel: "Cancel",
	groupBy: "Group By",
	chartType: "Chart type",
	count: "count",
	fields: "Fields",
	filters: "Filters",
	line: "Line",
	logScale: "Logarithmic scale",
	max: "max",
	min: "min",
	operationNotDefined: "Operation is not defined",
	layoutIncorrect: "pivotLayout should be an Array instance",
	pivotMessage: "Click to configure",
	popupHeader: "Pivot Settings",
	radar: "Radar",
	radarArea: "Area Radar",
	select: "select",
	settings: "Settings",
	stackedBar: "Stacked Bar",
	sum: "sum",
	text: "text",
	values: "Values",
	valuesNotDefined: "Values or Group field are not defined",
	windowMessage: "[move fields into required sector]"
};

webix.protoUI({
	name:"pivot-chart",
	defaults: {
		fieldMap: {},
		rows:[],
		filterLabelAlign: "right",
		filterWidth: 300,
		editButtonWidth: 110,
		filterLabelWidth: 100,
		chartType: "bar",
		color: "#36abee",
		chart:{
		},
		singleLegendItem: 1,
		palette: [
			/*["#e33fc7","#a244ea","#476cee","#36abee","#58dccd","#a7ee70"],
			["#d3ee36","#eed236","#ee9336","#ee4339","#7faf1b","#065c27"],
			["#034225","#6c9eec" ,"#4a525a","#98bcf4","#fffe04","#f0c430"],
			["#242464","#feeab1","#78a4b0","#02fffd", "#d6806f","#990001"],
			[ "#ffaa7d" ,"#45828c", "#a64e78","#800f3e","#3c79d2" ,"#8f7bc1"],
			["#daeaff" ,"#e4ee26", "#d3b0d1", "#717171", "#b4d9a4","#684da9"]*/
			["#e33fc7","#a244ea","#476cee","#36abee","#58dccd","#a7ee70"],
			["#d3ee36","#eed236","#ee9336","#ee4339","#595959","#b85981" ],




			[ "#c670b8","#9984ce","#b9b9e2","#b0cdfa","#a0e4eb","#7faf1b" ],
			[ "#b4d9a4", "#f2f79a","#ffaa7d", "#d6806f", "#939393", "#d9b0d1"],
			["#780e3b","#684da9","#242464","#205793","#5199a4", "#065c27"],
			["#54b15a","#ecf125","#c65000","#990001","#363636", "#800f3e"]
		]
	},
	templates:{
		groupNameToStr: function(name,operation){
			return name+"_"+operation;
		},
		groupNameToObject: function(name){
			var arr = name.split("_");
			return {name:arr[0],operation:arr[1]};
		},
		seriesTitle: function(data,i){
			var name = this.config.fieldMap[data.name]||data.name;
			var operation = (webix.isArray(data.operation)?data.operation[i]:data.operation);
			return name+" ( "+(webix.i18n.pivot[operation]||operation)+")"
		}
	},
	templates_setter: function(obj){
		if(typeof obj == "object")
			webix.extend(this.templates,obj);
	},
	chartMap: {
		bar: function(color){
			return {
				border:0,
				alpha:1,
				radius:0,
				color: color
			}
		},
		line: function(color){
			return {
				alpha:1,
				item:{
					borderColor: color,
					color: color
				},
				line:{
					color: color,
					width:2
				}
			}
		},
		radar: function(color){
			return {
				alpha:1,
				fill: false,
				disableItems: true,
				item:{
					borderColor: color,
					color: color
				},
				line:{
					color: color,
					width:2
				}
			}
		}
	},
	chartMap_setter: function(obj){
		if(typeof obj == "object")
			webix.extend(this.chartMap,obj,true);
	},
	$init: function(config) {
		if (!config.structure)
			config.structure = {};
		webix.extend(config.structure, { groupBy:"", values:[], filters:[] });

		this.$view.className +=" webix_pivot_chart";
		webix.extend(config, {editButtonWidth: this.defaults.editButtonWidth});
		webix.extend(config, this.getUI(config));

		this.$ready.push(this.render);
		this.data.attachEvent("onStoreUpdated", webix.bind(function() {
			// call render if pivot is initialized
			if (this.$$("chart")) this.render(this,arguments);
		}, this));
	},
	getUI: function(config) {
		var header = {
			view: "toolbar",
			id: "toolbar",
			cols:[
				{ id: "filters", hidden:true, cols:[] },
				{
					id:"edit", view: "button", type: "iconButton",align: "right", icon: "cog", inputWidth: config.editButtonWidth,
					label: this._applyLocale("settings"), click: webix.bind(this.configure,this)
				},
				{ width: 5 }
			]
		};

		var chart = { id: "bodyLayout", type: "line", margin: 10, cols:[{id:"chart", view: "chart"}] };
		return { rows: [ header, chart ]}
	},
	configure: function() {
		if (!this.pivotPopup) {

			var config = { id:"popup", view:"webix_pivot_config", operations:[], pivot: this.config.id };
			webix.extend(config , this.config.popup||{});

			this.pivotPopup = webix.ui(config);
			this.pivotPopup.attachEvent("onApply", webix.bind(function(structure) {
				this.config.chartType = this.pivotPopup.$$("chartType")?this.pivotPopup.$$("chartType").getValue():"bar";
				this.config.chart.scale = (this.pivotPopup.$$("logScale").getValue()?"logarithmic":"linear");
				webix.extend(this.config.structure, structure, true);
				this.render();
			}, this));
		}

		var functions = [];
		for (var i in this.operations) functions.push({name: i, title: this._applyLocale(i)});
		this.pivotPopup._valueLength = this._valueLength;
		this.pivotPopup.define("operations", functions);
		var pos = webix.html.offset(this.$$("chart").getNode());
		this.pivotPopup.setPosition(pos.x + 10, pos.y + 10);
		this.pivotPopup.define("data", this.getFields());
		this.pivotPopup._valueFields =
		this.pivotPopup.show();
	},
	render: function(mode) {
		// render filters
		var filters = this._processFilters();
		if (filters.length) {
			filters.push({});
			this.$$("filters").show();
			this.$$("filters").define("cols", filters);
			this._setFilterEvents();
		} else {
			this.$$("filters").hide();
		}
		this._initFilters();

		this._setChartConfig();

		this._loadFilteredData();
	},
	_setChartConfig: function() {
		var config = this.config;
		var values = config.structure.values;

		for (var i = 0; i < values.length; i++) {
			values[i].operation = values[i].operation || ["sum"];
			if (!webix.isArray(values[i].operation))
				values[i].operation = [values[i].operation];
		}

		var chartType = this.config.chartType||"bar";
		var mapConfig = this.chartMap[chartType];

		var chart = {
			"type":  (mapConfig&&mapConfig("").type?mapConfig("").type:chartType),
			"xAxis": webix.extend({template: "#id#"},config.chart.xAxis||{}),
			"yAxis": webix.extend({},config.chart.yAxis||{})
		};

		webix.extend(chart,config.chart);

		var result = this._getSeries();

		chart.series = result.series;

		chart.legend = false;
		if(config.singleLegendItem || this._valueLength>1){
			chart.legend = result.legend;
		}

		chart.scheme = {
			$group: this._pivot_group,
			$sort:{
				by: "id"
			}
		};
		this.$$("chart").removeAllSeries();
		for(var c in chart){
			this.$$("chart").define(c,chart[c]);
		}

	},
	_applyLocale: function(value){
		return webix.i18n.pivot[value]||value
	},
	_applyMap: function(value){
		return this.config.fieldMap[value]||value
	},
	_processFilters: function() {
		var filters = this.config.structure.filters || [];

		var items = [];
		for (var i = 0; i < filters.length; i++) {
			var f = filters[i];
			var item = { value: f.value, label: this._applyMap(f.name), field: f.name, view: f.type ,
						labelAlign: this.config.filterLabelAlign, labelWidth: this.config.filterLabelWidth, width: this.config.filterWidth};
			if (f.type == "select")
				item.options = this._distinctValues(f.name);
			items.push(item);
		}
		return items;
	},
	_distinctValues: function(field) {
		var values = [{value:"",id:""}];
		var data = this.data.pull;
		var hash = {};
		for (var obj in data) {
			var value = data[obj][field];
			if (!webix.isUndefined(value)){
				if (!hash[value]) {
					values.push({ value:value, id:value });
					hash[value] = true;
				}
			}
		}
		values.sort(function(a,b) {
			var val1 = a.value;
			var val2 = b.value;
			if (!val2) return 1;
			if (!val1) return -1;

			val1 = val1.toString().toLowerCase(); val2=val2.toString().toLowerCase();
			return val1>val2?1:(val1<val2?-1:0);
		});
		return values;
	},
	_loadFilteredData: function(){
		this._initFilters();
		this.data.silent(function(){
			this.data.filter(webix.bind(this._filterItem,this));
		},this);
		this.$$("chart").data.silent(function(){
			this.$$("chart").clearAll();
		},this);
		this.$$("chart").parse(this.data.getRange());


	},
	_setFilterEvents: function() {
		var filters = this.$$("filters");
		filters.reconstruct();
		var children = filters.getChildViews();
		var pivot = this;

		for (var i = 0; i < children.length; i++) {
			var el = children[i];
			if (el.name == "select")
				el.attachEvent("onChange", function(newvalue) {
					pivot._setFilterValue(this.config.field, newvalue);
				});
			else if (!webix.isUndefined(el.getValue)){
				el.attachEvent("onTimedKeyPress", function() {
					pivot._setFilterValue(this.config.field, this.getValue());
				});
			}

		}
	},

	_setFilterValue: function(field, value) {
		var filters = this.config.structure.filters;
		for (var i = 0; i < filters.length; i++)
			if (filters[i].name == field) {
				filters[i].value = value;
				this._loadFilteredData();
				return true;
			}
		return false;
	},

	groupNameToStr: function(obj){
		return obj.name+"_"+obj.operation;
	},
	groupNameToObject: function(name){
		var arr = name.split("_");
		return {name:arr[0],operation:arr[1]};
	},
	_getSeries: function(){
		var i, j, legend, map = {}, name, legendTitle, series = [],
			values = this.config.structure.values;

		// legend definition
		legend = {
			valign:"middle",
			align:"right",
			width:140,
			layout:"y"
		};
		webix.extend(legend,this.config.chart.legend||{},true);
		legend.values = [];
		if(!legend.marker)
			legend.marker = {};
		legend.marker.type = (this.config.chartType=="line"?"item":"s");




		this.series_names = [];
		this._valueLength = 0;

		for(i =0; i < values.length; i++){
			if(!webix.isArray(values[i].operation)){
				values[i].operation = [values[i].operation];
			}
			if(!webix.isArray(values[i].color)){

				values[i].color = [values[i].color||this._getColor(this._valueLength)];
			}
			for(j=0;j<values[i].operation.length;j++){

				name = this.templates.groupNameToStr(values[i].name,values[i].operation[j]);
				this.series_names.push(name);
				if(!values[i].color[j])
					values[i].color[j] = this._getColor(this._valueLength);
				var color = values[i].color[j];
				var sConfig = this.chartMap[this.config.chartType](color)||{};
				sConfig.value = "#"+name+"#";
				sConfig.tooltip = {
					template: webix.bind(function(obj){
						return obj[this].toFixed(3)
					},name)
				};

				series.push(sConfig);
				legendTitle = this.templates.seriesTitle.call(this,values[i],j);
				legend.values.push({
					text: legendTitle,
					color: color
				});
				map[name]= [values[i].name,values[i].operation[j]];
				this._valueLength++;
			}
		}
		this._pivot_group = {};
		if(values.length)
			this._pivot_group = webix.copy({
				by:  this.config.structure.groupBy,
				map: map
			});

		return {series: series,legend: legend};
	},
	_getColor:function(i){
		var palette = this.config.palette;
		var rowIndex = i/palette[0].length;
		rowIndex = (rowIndex> palette.length?0:parseInt(rowIndex,10));
		var columnIndex = i%palette[0].length;
		return palette[rowIndex][columnIndex];
	},
	_processLegend: function() {
		var i, legend, name,
			values=this.config.structure.values;

		legend = {
			valign:"middle",
			align:"right",
			width:140,
			layout:"y"
		};

		webix.extend(legend,this.config.chart.legend||{},true);

		legend.values = [];
		if(!legend.marker)
			legend.marker = {};
		legend.marker.type = (this.config.chartType=="line"?"item":"s");


		for(i =0; i < values.length; i++){
			name = this.templates.seriesTitle.call(this,values[i]);

			legend.values.push({
				text: name,
				color: values[i].color
			});
		}

		return legend;
	},
	operations: { sum: 1, count:1, max: 1, min: 1},
	addGroupMethod: function(name, method){
		this.operations[name] = 1;
		if(method)
			webix.GroupMethods[name] = method;
	},
	removeGroupMethod: function(name){
		delete this.operations[name];
	},
	groupMethods_setter: function(obj){
		for(var a in obj){
			if(obj.hasOwnProperty(a))
				this.addGroupMethod(a, obj[a]);
		}
	},
	// fields for edit popup
	getFields: function() {

		var i,
			fields = [],
			fields_hash = {};
		for (i = 0; i < Math.min(this.data.count() || 5); i++) {
			var item = this.data.getItem(this.data.getIdByIndex(i));
			for (var f in item) {
				if (!fields_hash[f]) {
					fields.push(f);
					fields_hash[f] = webix.uid();
				}
			}
		}

		var str = this.config.structure;
		var result = { fields:[], groupBy:[], values:[], filters:[] };


		var field = (typeof str.groupBy == "object"?str.groupBy[0]:str.groupBy);
		if (!webix.isUndefined(fields_hash[field])) {
			result.groupBy.push({name: field, text: this._applyMap(field), id: fields_hash[field]});
			delete fields_hash[field];
		}

		var valueNameHash = {};
		for (i = 0; i < str.values.length; i++) {
			var field = str.values[i];
			if (!webix.isUndefined(fields_hash[field.name])) {
				var text = this._applyMap(field.name);
				if(webix.isUndefined(valueNameHash[field.name])){
					valueNameHash[field.name] = result.values.length;
					result.values.push({name: field.name, text: text, operation: field.operation, color: field.color||[this._getColor(i)], id: fields_hash[field.name]});
				}
				else{
					var value = result.values[valueNameHash[field.name]];
					value.operation =value.operation.concat(field.operation);
					value.color =value.color.concat(field.color||[this._getColor(i)]);
				}

				//delete fields_hash[field.name];   // values allows to drag a field multiple times
			}
		}

		for (i = 0; i < (str.filters || []).length; i++) {
			var field = str.filters[i];
			if (!webix.isUndefined(fields_hash[field.name])) {
				var text = this._applyMap(field.name);
				result.filters.push({name: field.name, text: text, type:field.type, value:field.value, id: fields_hash[field]});
				delete fields_hash[field.name];
			}
		}

		for (i = 0; i < fields.length; i++) {
			var field = fields[i];
			if (!webix.isUndefined(fields_hash[field]))
				result.fields.push({name:field, text: this._applyMap(field), id: fields_hash[field]});
		}
		return result;
	},

	_initFilters: function() {
		var filters = this.config.structure.filters || [];
		for (var i = 0; i < filters.length; i++) {
			var f = filters[i];
			var fvalue = (f.value || "").trim();

			if (fvalue.substr(0,1) == "=") {
				f.func = this.filters.equals;
				fvalue = fvalue.substr(1);
			} else if (fvalue.substr(0,2) == ">=") {
				f.func = this.filters.more_equals;
				fvalue = fvalue.substr(2);
			} else if (fvalue.substr(0,1) == ">") {
				f.func = this.filters.more;
				fvalue = fvalue.substr(1);
			} else if (fvalue.substr(0,2) == "<=") {
				f.func = this.filters.less_equals;
				fvalue = fvalue.substr(2);
			} else if (fvalue.substr(0,1) == "<") {
				f.func = this.filters.less;
				fvalue = fvalue.substr(1);
			}else if (fvalue.indexOf("...") > 0) {
				f.func = this.filters.range;
				fvalue = fvalue.split("...");
			}else if (fvalue.indexOf("..") > 0) {
				f.func = this.filters.range_inc;
				fvalue = fvalue.split("..");
			} else
				f.func = this.filters.contains;

			f.fvalue = fvalue;
		}
	},

	_filterItem: function(item) {

		var filters = this.config.structure.filters || [];
		for (var i = 0; i < filters.length; i++) {

			var f = filters[i];

			if (f.fvalue == "") continue;

			if (webix.isUndefined(item[f.name])) return false;

			var value = item[f.name].toString().toLowerCase();


			var result = f.func.call(this.filters, f.fvalue, value);

			if (!result) return false;
		}

		return true;
	},
	filters: {
		_num_helper: function(fvalue, value, func) {
			if(typeof fvalue == "object"){
				for(var i=0; i < fvalue.length; i++){
					fvalue[i] = window.parseFloat(fvalue[i], 10);
					if (window.isNaN(fvalue[i])) return true;
				}
			}
			else{
				fvalue = window.parseFloat(fvalue, 10);
				// if filter value is not a number then ignore such filter
				if (window.isNaN(fvalue)) return true;
			}
			// if row value is not a number then don't show this row
			if (window.isNaN(value)) return false;
			return func(fvalue, value);
		},
		contains: function(fvalue, value) {
			return value.indexOf(fvalue.toString().toLowerCase()) >= 0;
		},
		equals: function(fvalue, value) {
			return this._num_helper(fvalue, value, function(fvalue, value) {
				return (fvalue == value);
			});
		},
		more: function(fvalue, value) {
			return this._num_helper(fvalue, value, function(fvalue, value) {
				return (value > fvalue);
			});
		},
		more_equals: function(fvalue, value) {
			return this._num_helper(fvalue, value, function(fvalue, value) {
				return (value >= fvalue);
			});
		},
		less: function(fvalue, value) {
			return this._num_helper(fvalue, value, function(fvalue, value) {
				return (value < fvalue);
			});
		},
		less_equals: function(fvalue, value) {
			return this._num_helper(fvalue, value, function(fvalue, value) {
				return (value <= fvalue);
			});
		},
		range: function(fvalue, value){
			return this._num_helper(fvalue, value, function(fvalue, value) {
				return (value < fvalue[1] && value >= fvalue[0]);
			});
		},
		range_inc: function(fvalue, value){
			return this._num_helper(fvalue, value, function(fvalue, value) {
				return (value <= fvalue[1] && value >= fvalue[0]);
			});
		}
	},
	getStructure: function() {
		return this.config.structure;
	},
	getConfigWindow: function(){
		return this._config_popup;
	}
}, webix.IdSpace, webix.ui.layout, webix.DataLoader, webix.EventSystem, webix.Settings);




webix.protoUI({
	name: "webix_pivot_config",

	$init: function(config) {
		this.$view.className += " webix_pivot_popup";
		webix.extend(config,this.defaults);
		webix.extend(config, this._getUI(config));
		this.$ready.push(this._afterInit);
	},
	defaults:{
		padding:8,
		height: 440,
		width: 600,
		head: false,
		modal:true,
		move: true,
		chartTypeLabelWidth: 80,
		chartTypeWidth: 250,
		cancelButtonWidth: 100,
		applyButtonWidth: 100,
		logScaleLabelWidth: 120,
		fieldsColumnWidth: 250
	},
	_test: function(ctx){
		console.log(ctx)
	},
	_getUI: function(config) {
		var chartTypes = [];
		var pivot = $$(config.pivot);
		var types = pivot.chartMap;
		for(var type in types){
			chartTypes.push({id: type, value: pivot._applyLocale(type)})
		}
		return {
			head:{
				view:"toolbar",
				cols: [
					{ id: "config_title", data:{value: "windowMessage"}, css:"webix_pivot_transparent", borderless: true, template: this._popup_templates.popupHeaders /*this._popup_templates.popupHeaders*/},
					{ view: "button", id: "cancel", type: "iconButton", icon: "times", label: pivot._applyLocale("cancel"), width: config.cancelButtonWidth },
					{ view: "button", id: "apply", type: "iconButton", icon: "check", css:"webix_pivot_apply", label:pivot._applyLocale("apply"), width:config.applyButtonWidth }
				]
			},
			body: {

				rows:[

					{
						type: "wide",
						margin: 5,

						cols: [
							{
								width: config.fieldsColumnWidth,
								rows: [
									{ id: "config_title", data:{value: "fields"}, template: this._popup_templates.popupHeaders, type: "header" },
									{ id: "fields", view: "list", scroll: false, type: {height: 35}, drag: true, template: "<span class='webix_pivot_list_marker'></span>#text#",
										on:{
											onBeforeDrop: webix.bind(this._skipValueDrag,this),
											onBeforeDropOut: webix.bind(this._checkValueDrag,this),

											onBeforeDrag:  webix.bind(this._hidePopups,this)
										}
									}
								]
							},
							{ view: "resizer"},
							{
								rows:[
									{ id: "filtersHeader", data:{value: "filters"}, template: this._popup_templates.popupIconHeaders, type: "header" },
									{ id: "filters", view: "list", scroll: true, gravity:2, type: "PivotList", drag: true, css: "webix_pivot_values",
										template: function (obj) {
											obj.type = obj.type || "select";
											return "<div class='webix_pivot_link'>" + obj.text+ "<div class='webix_link_selection filter'>" + obj.type + "</div></div> "
										},
										type: {
											height: 35
										},
										onClick: { "webix_link_selection": webix.bind(this._filterSelector, this) },
										on: {
											onBeforeDrag:  webix.bind(this._hidePopups,this)
										}

									},

									{ id: "valuesHeader", data:{value: "values"}, template: this._popup_templates.popupIconHeaders, type: "header" },
									{ id: "values", view: "list", scroll: true, gravity:3, drag: true, css: "webix_pivot_values", type: { height: "auto" },
										template: webix.bind(this._function_template, this),
										onClick: {
											"webix_link_title": webix.bind(this._function_selector, this),
											"webix_link_selection": webix.bind(this._function_selector, this),
											"webix_color_selection": webix.bind(this._function_color, this),
											"webix_pivot_minus": webix.bind(this._function_remove, this)
										},
										on:{
											onBeforeDrop: webix.bind(this._copyValueField,this),
											onBeforeDropOut: webix.bind(this._checkValueDrag,this),
											onBeforeDrag:  webix.bind(this._hidePopups,this)
										}
									},
									{ id: "groupHeader", data:{value: "groupBy"}, template: this._popup_templates.popupIconHeaders, type: "header" },
									{ id: "groupBy", view: "list", yCount:1, type: "PivotList", scroll: false, drag: true, type: {height: 35},
										template: "<a class='webix_pivot_link'>#text#</a> ",
										on:{
											onBeforeDrop: webix.bind(this._changeGroupby,this),
											onBeforeDrag:  webix.bind(this._hidePopups,this)
										}
									}



								]
							}
						]
					},{
						borderless: true,
						padding: 5,
						type: "space",
						cols:[
							{
								view: "checkbox", id:"logScale", value: (pivot.config.chart.scale&&pivot.config.chart.scale == "logarithmic"), label: webix.i18n.pivot.logScale,
								labelWidth: config.logScaleLabelWidth, width: (config.logScaleLabelWidth + 20)
							},
							{},
							{
								 view: "richselect", id:"chartType", value: pivot.config.chartType,  label: webix.i18n.pivot.chartType,  options: chartTypes,
								 labelWidth: config.chartTypeLabelWidth,  width: config.chartTypeWidth
							}


						]

					}
				]

			}
		}
	},
	_popup_templates: {
		popupHeaders: function(obj){
			return webix.i18n.pivot[obj.value];
		},
		popupIconHeaders: function(obj){
			return "<span class='webix_pivot_popup_icon "+obj.value+"'></span>"+webix.i18n.pivot[obj.value];
		}
	},
	_hidePopups: function(){
		webix.callEvent("onClick",[]);
	},
	_skipValueDrag: function(ctx){
		if(ctx.from == this.$$("values")){
			var id = ctx.source[0];
			if(this.$$("values").getItem(id)){
				this.$$("values").remove(id);
			}
			return false
		}
		return true
	},
	_checkValueDrag: function(ctx){
		if(ctx.to != ctx.from){
			var id = ctx.source[0];
			if(ctx.from == this.$$("values") && ctx.to != this.$$("fields")){
				delete this.$$("values").getItem(id).operation;
				delete this.$$("values").getItem(id).color;
				if(this.$$("fields").getItem(id))
					this.$$("fields").remove(id);
			}
			else if(ctx.from == this.$$("fields") && ctx.to != this.$$("values")){
				if(this.$$("values").getItem(id)){
					this.$$("values").remove(id);
				}
			}
		}
	},
	_copyValueField: function(ctx){
		if( ctx.to && ctx.from != ctx.to ){
			var id = ctx.source;
			var item = ctx.from.getItem(id);

			if(ctx.from == this.$$("fields")){
				if(ctx.to.getItem(id)){
					this._function_add({},id);
					this._valueLength++;
				}
				else{
					item  = webix.copy(item);

					ctx.to.add(webix.copy(item),ctx.index);
					this._valueLength++;
				}

				return false;
			}
			else if(!this.$$("fields").getItem(id)){
				this.$$("fields").add(webix.copy(item));
			}

			this._increaseColorIndex = true;
		}
		return true
	},
	_changeGroupby: function(ctx){
		if(this.$$("groupBy").data.order.length){
			var id = this.$$("groupBy").getFirstId();
			var item = webix.copy(this.$$("groupBy").getItem(id));
			this.$$("groupBy").remove(id);
			this.$$("fields").add(item);
		}
		return true
	},
	_afterInit: function() {
		this.attachEvent("onItemClick", function(id){
			if (this.$eventSource.name == "button"){
				//transform button clicks to events
				var structure = this.getStructure();

				if(this.innerId(id) == "apply" && (!structure.values.length || !structure.groupBy)){
					webix.alert(webix.i18n.pivot.valuesNotDefined);
				}
				else{
					this.callEvent("on"+this.innerId(id), [structure]);
					this.hide();
				}
			}
		});
	},

	_function_template: function (obj) {
		obj.operation = obj.operation || ["sum"];
		if (!webix.isArray(obj.operation))
			obj.operation = [obj.operation];

		var ops = [];
		var pivot = $$(this.config.pivot);
		var locale = pivot._applyLocale;

		for (var i = 0; i < obj.operation.length; i++) {
			if(!obj.color)
				obj.color = [pivot._getColor(this._valueLength)];
			if(!obj.color[i])
				obj.color.push(pivot._getColor(this._valueLength))
			var op = "<div class='webix_pivot_link' webix_operation='" + i + "'>";
			op += "<div class='webix_color_selection'><div style='background-color:"+locale(obj.color[i])+"'></div></div>";
			op += "<div class='webix_link_title'>" + obj.text + "</div>";
			op += "<div class='webix_link_selection'>" + locale(obj.operation[i]) + "</div>";

			op += "<div class='webix_pivot_minus webix_icon fa-times'></div>";
			op += "</div>";
			ops.push(op);
		}
		if(this._increaseColorIndex){
			this._increaseColorIndex= false;
			this._valueLength++;
		}
		return ops.join(" ");
	},

	_function_selector: function(e,id) {
		var func_selector = {
			view: "webix_pivot_popup", autofit:true,
			height: 150, width: 150,
			data: this.config.operations||[]
		};
		var p = webix.ui(func_selector);
		p.show(e);
		p.attachEvent("onHide", webix.bind(function() {
			var index = webix.html.locate(e, "webix_operation");
			var sel = p.getSelected();
			if (sel !== null) {
				this.$$("values").getItem(id).operation[index] = sel.name;
				this.$$("values").updateItem(id);
			}

			p.close();
		}, this));
	},
	_function_color: function(e,id) {

		var colorboard = {
			view: "colorboard",
			id: "colorboard",
			borderless: true

		};
		if($$(this.config.pivot).config.colorboard){
			webix.extend(colorboard,$$(this.config.pivot).config.colorboard);
		}
		else{
			webix.extend(colorboard,{
				width:  150,
				height: 150,
				palette: $$(this.config.pivot).config.palette
			});
		}

		var p = webix.ui({
			view:"popup",
			id: "colorsPopup",
			body:colorboard
		});
		p.show(e);
		p.getBody().attachEvent("onSelect",function(){
			p.hide();
		});
		p.attachEvent("onHide", webix.bind(function() {
			var index = webix.html.locate(e, "webix_operation");
			var value = p.getBody().getValue();
			if (value) {
				this.$$("values").getItem(id).color[index] = value;
				this.$$("values").updateItem(id);
			}
			p.close();
		}, this));
		return false
	},
	_function_add: function(e,id) {
		var item = this.$$("values").getItem(id);
		item.operation.push("sum");
		var pivot = $$(this.config.pivot);
		var palette = pivot.config.palette;
		item.color.push(pivot._getColor(this._valueLength));
		this.$$("values").updateItem(id);

		webix.delay(function(){
			var index = item.operation.length-1;
			var els = this.$$("values").getItemNode(id).childNodes;
			var el = null;
			for (var i = 0; i < els.length; i++) {
				el = els[i];
				if (!el.getAttribute) continue;
				var op = el.getAttribute("webix_operation");
				if (!webix.isUndefined(op) && op == index) break;
			}
			if (el!==null)
				this._function_selector(el, id);
		}, this)
	},
	_function_remove: function(e, id) {
		var index = webix.html.locate(e, "webix_operation");
		var item = this.$$("values").getItem(id);
		if (item.operation.length > 1) {
			item.operation.splice(index, 1);
			this.$$("values").updateItem(id);
		} else {
			this.$$("values").remove(id);
			//this.$$("values").move(id, null, this.$$("fields"));
		}
		return false;
	},

	_filterSelector: function(e,id) {
		var locale = $$(this.config.pivot)._applyLocale;
		var selector = {
			view: "webix_pivot_popup", autofit:true,
			height: 150, width: 150,
			data: [{name:"select", title: locale("select")},{name:"text", title: locale("text")}]
		};
		var p = webix.ui(selector);
		p.show(e);
		p.attachEvent("onHide", webix.bind(function() {
			var sel = p.getSelected();
			if (sel !== null) {
				var item = this.$$('filters').getItem(id);
				item.type = sel.name;
				this.$$('filters').updateItem(id);
			}

			p.close();
		}, this));
	},

	data_setter: function(value) {
		this.$$("fields").clearAll();
		this.$$("fields").parse(value.fields);

		this.$$("filters").clearAll();
		this.$$("filters").parse(value.filters);

		this.$$("groupBy").clearAll();
		this.$$("groupBy").parse(value.groupBy);


		this.$$("values").clearAll();
		this.$$("values").parse(value.values);
	},
	getStructure: function() {
		var structure = { groupBy:"",values:[],filters:[] };

		var groupBy = this.$$("groupBy");
		if(groupBy.count())
			structure.groupBy = groupBy.getItem(groupBy.getFirstId()).name;


		var values = this.$$("values");
		var temp;
		values.data.each(webix.bind(function(obj){
			for(var j=0; j< obj.operation.length; j++){
				temp = webix.copy(obj);

				webix.extend(temp,{operation: obj.operation[j],color:  obj.color[j]||$$(this.config.pivot).config.color},true);

				structure.values.push(temp);
			}
		},this));

		var filters = this.$$("filters");
		filters.data.each(function(obj){
			structure.filters.push(obj);
		});

		return structure;
	}
}, webix.ui.window, webix.IdSpace);


webix.protoUI({
	name:"webix_pivot_popup",
	_selected: null,
	$init: function(config) {
		webix.extend(config, this._get_ui(config));
		this.$ready.push(this._after_init);
	},
	_get_ui: function(config) {
		return {
			body: {
				id:"list", view:"list", scroll:false, borderless: true, autoheight:true, template:"#title#", data: config.data
			}
		}
	},
	_after_init: function() {
		this.attachEvent("onItemClick", function(id){
			this._selected = this.$eventSource.getItem(id);
			this.hide();
		});
	},
	getSelected: function() {
		return this._selected;
	}
}, webix.ui.popup, webix.IdSpace);



