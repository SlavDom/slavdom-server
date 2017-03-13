/* @flow */
import Base from './base';
const Types = require('./data-types.json');

export default class Translation extends Base {

    constructor() {
        let fields: JSON = {
            id: {
                type: Types.number.int64,
                primaryKey: true,
                autoIncrement: true
            },
            code: {
                type: Types.string.string,
            },
            language: {
                type: Types.string.varchar,
                length: 5
            },
            result: {
                type: Types.string.text
            }
        };
        let options: JSON = {
        };
        super('Translation', fields, options);
    }

    init(): Promise<Translation> {
        return Promise.all([
        this.knex.schema.createTableIfNotExists(this.tableName, table => {
            table.uuid('id');
            table.string('code');
            table.integer('language');
            //TODO: do not create FK if it exists already.
            table.foreign('language').references('languages.id').onDelete('CASCADE');
            table.text('result');
            table.primary('id');
        })
            ]);
    }

    drop(): Promise<any> {
        return Promise.all([
            this.knex.schema.table(this.tableName, table => {
                let promise = new Promise((resolve, reject) => {
                    this.knex.schema.hasTable(this.tableName).then(exists => {
                        if (exists) {
                            table.dropForeign('language', 'translations_language_foreign');
                        }
                    });
                });
                promise.then(this.knex.schema.dropTableIfExists(this.tableName))
                promise.catch(err => console.log(err));
            })
        ]);
    }

    getByCodeAndLang(code: string, lang: number): Promise<any> {
        return Promise.all([
            this.knex(this.tableName).where({
            code: code,
            languages: lang
        }).select()
            ]);
    }

    //TODO: think about transactions here - http://knexjs.org/#Builder-transacting
    create(model: Translation): Promise<any> {
        return Promise.all([
        this.knex.transaction(trx => {
            this.knex(this.tableName)
                .transacting(trx)
                .insert(model)
                .then(resp => {
                    let id = resp[0];
                    //Some external methods can be called here;
                })
                .then(trx.commit)
                .catch(trx.rollback);
        })
            .then(inserts => console.log(inserts + " - Transaction is completed."))
            .catch(error =>  console.error(error))
            ]);
    }

    createSimple(model: Translation): Promise<any> {
        return Promise.all([
        this.knex.insert(model)
            ]);
    }

    update(model: Translation) {

    }
}