/* @flow */
import init from '../db';
import * as _ from 'lodash';

export default class Base {

    name: string;
    fields: JSON;
    options: JSON;
    tableName: string;

    constructor(name: string, fields: JSON, options: JSON) {
        this.name = name;
        this.fields = fields;
        this.options = options;
        this.knex = init();
        this.tableName = _.lowerCase(name) + 's';
    }

    init() {

    }

    drop(): Promise<any> {
        return Promise.all([
            this.knex.schema.dropTableIfExists(this.tableName)
            ]);
    }

    read(id: number): Promise<any> {
        return Promise.all([
            this.knex(this.tableName).where({
            id: id
        }).select()
            ]);
    }

    create(model: Base): Promise<any> {

    }

    del(id: number): Promise<any> {
        return Promise.all([
        this.knex(this.tableName).where({
            id: id
        }).del()
            ]);
    }

    update(model: Base): Promise<any> {

    }
}