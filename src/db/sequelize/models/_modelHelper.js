import * as _ from 'lodash';
import * as __ from 'lodash-inflection';

const settings = {
    pluralTableNames: true
};

export default {
    getName: getDbName,
    defineForeignKey,
    defineModel
};

function getDbName(name) {
    return _.snakeCase(name);
}

function defineForeignKey(name) {
    return {
        name: name,
        field: getDbName(name)
    };
}

function defineModel(name: string, fields, options, sequelize) {
    if (!options) options = {};

    if (!options.tableName) {
        let tableName = name;
        if (settings.pluralTableNames) {
            tableName = __.pluralize(name);
        }
        tableName = getDbName(tableName);
        options.tableName = tableName;
    }

    _.forEach(_.keys(fields), (fieldKey) => {
        fields[fieldKey].field = getDbName(fieldKey);
    });
    debugger;
    return sequelize.define(name, fields, options);
}