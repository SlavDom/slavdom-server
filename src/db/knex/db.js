import * as data from '../../../data/config/default.json';

const db = data["db"];

export default function init() {
    const knex = require("knex")({
        client: 'pg',
        connection: {
            host : db["host"],
            user : db["user"],
            password : db["password"],
            database : db["db"]
        }
    });
    return knex;
}
