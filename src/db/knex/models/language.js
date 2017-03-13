/* @flow */
import Base from './base';
const Types = require('./data-types.json');

export default class Language extends Base {

    constructor() {
        let fields: JSON = {
            id: {
                type: Types.number.int32,
                primaryKey: true,
                autoIncrement: true
            },
            code: {
                type: Types.string.varchar,
                length: 5
            },
        };
        let options: JSON = {
        };
        super('Language', fields, options);
    }

    init(): Promise<any> {
        return Promise.all([
        this.knex.schema.createTableIfNotExists(this.tableName, table => {
            table.increments();
            table.string('code');
        })
            ]);
    }

    drop(): Promise<any> {
        return Promise.all([
            this.knex.schema.dropTableIfExists(this.tableName)
        ]);
    }
}