Ext.define('Rally.technicalservices.TwoDGridSettings',{
    singleton: true,

    getFields: function(config){

        var sortBy = config.sortBy || 'alpha',
            sortDir = config.sortDir || 'desc';

        var width = 150;
        var settings = [{
            xtype: 'rallycombobox',
            name: 'modelName',
            fieldLabel: 'Artifact Type',
            labelWidth: width,
            labelAlign: 'right',
            bubbleEvents: ['change'],
            valueField: 'TypePath',
            value: config.modelName,
            storeConfig: {
                model: 'TypeDefinition',
                remoteSort: true,
                remoteFilter: true,
                filters: [{
                    property: 'Creatable',
                    value: true
                },{
                    property: 'Deletable',
                    value: true
                },{
                    property: 'Restorable',
                    value: true
                },{
                    property: 'Name',
                    operator: '!=',
                    value: 'Milestone'
                }]
            }
        },{
            xtype: 'rallyfieldcombobox',
            model: config.modelName,
            name: 'xAxisField',
            fieldLabel: 'X Axis Field',
            labelWidth: width,
            labelAlign: 'right',
            blackListFields: [],
            whiteListFields: ['Release','Iteration','ScheduleState','State'],
            allowedTypes: ['STRING','RATING'],
            constrained: true,
            bubbleEvents: ['change'],
            value: config.xAxisField,
            handlesEvents: {
                change: function(cb) {
                    if (cb.name === 'modelName'){
                        this.refreshWithNewModelType(cb.getRecord().get('TypePath'));
                    }
                }
            }
        },{
            name: 'xAxisValues',
            xtype: 'multivaluecombo',
            readyEvent: 'ready',
            labelWidth: width,
            labelAlign: 'right',
            width: 500,
            modelName: config.modelName,
            fieldName: null,
            emptyText: 'Choose field values to limit columns or leave blank to show all values...',
            fieldLabel: 'X Axis Values',
            handlesEvents: {
                change: function(cb) {
                    if (cb.name === 'modelName'){
                        this.setModel(cb.getRecord().get('TypePath'));
                    }
                    if (cb.name === 'xAxisField'){
                        this.refreshField(cb.getValue());
                        this.currentValue = '';
                    }
                }
            }
        },{
            xtype: 'rallyfieldcombobox',
            model: config.modelName,
            name: 'yAxisField',
            labelAlign: 'right',
            fieldLabel: 'Y Axis Field',
            labelWidth: width,
            blackListFields: [],
            whiteListFields: ['Release','Iteration','Project','ScheduleState','State','Owner','SubmittedBy','Tags','Parent','PortfolioItem','Milestones'],
            allowedTypes: ['STRING','RATING'],
            constrained: true,
            bubbleEvents: ['change'],
            value: config.yAxisField,
            handlesEvents: {
                change: function(cb) {
                    if (cb.name === 'modelName'){
                        this.refreshWithNewModelType(cb.getRecord().get('TypePath'));
                    }
                }
            }
        },{
            name: 'yAxisValues',
            xtype: 'multivaluecombo',
            //margin: '0 0 25 10',
            readyEvent: 'ready',
            labelWidth: width,
            labelAlign: 'right',
            width: 500,
            modelName: config.modelName,
            fieldName: null,
            fieldLabel: 'Y Axis Values',
            emptyText: 'Choose field values to limit rows or leave blank to show all values...',
            handlesEvents: {
                change: function(cb) {
                    if (cb.name === 'modelName'){
                        this.setModel(cb.getRecord().get('TypePath'));
                    }
                    if (cb.name === 'yAxisField'){
                        this.refreshField(cb.getValue());
                        this.currentValue = '';
                    }
                }
            }
        },{
            xtype: 'rallycheckboxfield',
            fieldLabel: 'Include Blanks',
            value: config.includeBlanks,
            name: 'includeBlanks',
            labelAlign: 'right',
            labelWidth: width
        },{
            xtype: 'rallycheckboxfield',
            fieldLabel: 'Include Row Totals',
            value: config.includeXTotal,
            name: 'includeXTotal',
            labelAlign: 'right',
            labelWidth: width
        },{
            xtype: 'rallycheckboxfield',
            fieldLabel: 'Include Column Totals',
            value: config.includeYTotal,
            name: 'includeYTotal',
            labelAlign: 'right',
            labelWidth: width
        },{
            xtype: 'radiogroup',
            fieldLabel: 'Sort By',
            columns: 1,
            vertical: true,
            labelWidth: width,
            labelAlign: 'right',
            items: [{
                boxLabel: "Alphabetical",
                name: 'sortBy',
                inputValue: 'alpha',
                checked: sortBy === 'alpha'
            },{
                boxLabel: "Total",
                name: 'sortBy',
                inputValue: 'total',
                checked: sortBy === 'total'
            }]
        },{
            xtype: 'radiogroup',
            fieldLabel: 'Sort Direction',
            columns: 1,
            vertical: true,
            labelWidth: width,
            labelAlign: 'right',
            items: [{
                boxLabel: "Descending",
                name: 'sortDir',
                inputValue: 'desc',
                checked: sortDir === 'desc'
            },{
                boxLabel: "Ascending",
                name: 'sortDir',
                inputValue: 'asc',
                checked: sortDir === 'asc'
            }]
        },{
            xtype: 'rallynumberfield',
            fieldLabel: 'Total Rows to Display (Blank for no limit)',
            name: 'rowLimit',
            labelWidth: width,
            labelAlign: 'right',
            minValue: 1,
            allowBlank: true,
            value: config.rowLimit
        },{
            xtype: 'textarea',
            fieldLabel: 'Query',
            name: 'gridFilter',
            anchor: '100%',
            cls: 'query-field',
            margin: '0 70 0 0',
            labelAlign: 'right',
            labelWidth: width,
            plugins: [
                {
                    ptype: 'rallyhelpfield',
                    helpId: 194
                },
                'rallyfieldvalidationui'
            ],
            validateOnBlur: false,
            validateOnChange: false,
            validator: function(value) {
                try {
                    if (value) {
                        Rally.data.wsapi.Filter.fromQueryString(value);
                    }
                    return true;
                } catch (e) {
                    return e.message;
                }
            }
        }];
        return settings;
    }
});
