import * as data from '../../../data/config/default.json';

const db = data["db"];

export default function init() {
    const knex = require("knex")({
        client: 'pg',
        connection: {
            host : db["host"],
            user : db["username"],
            password : db["password"],
            database : db["dbName"]
        }
    });
return knex;
    // return require('knex')({
    //     client: 'sqlite3',
    //     connection: {
    //         filename: "./db.sqlite"
    //     }
    // });
}
