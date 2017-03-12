// @flow
import pathHelper from "./helpers/pathHelper";

interface IConfigValues {
    app: {
        appName: string,
        isDevLocal: boolean,
        logErrors: boolean,
        rootUrl: string
    },
    db: {
        host: string,
        dbName: string,
        username: string,
        password: string
    },
    web: {
        port: number,
        sessionSecret: string
    },
    email: {
        fromNoReply: string
    },
    auth: {
        useAuth: boolean,
        google: {
            clientID: string,
            clientSecret: string
        },
        facebook: {
            clientID: string,
            clientSecret: string
        }
    },
    format: {
        date: string,
        year: string,
        currencySymbol: string
    }
}

let configValues = {};

ensureConfigPath();
const configReader = require('../data/config/default.json');
loadConfig();

export function loadConfig() {

    configValues.app = configReader.app;
    // configValues.app.appName = get('app.appName');
    // configValues.app.isDevLocal = get('app.isDevLocal');
    // configValues.app.logErrors = get('app.logErrors');
    // configValues.app.rootUrl = get('app.rootUrl');

    configValues.db = configReader.db;
    // configValues.db.host = get('db.host');
    // configValues.db.dbName = get('db.dbName');
    // configValues.db.username = get('db.username');
    // configValues.db.password = get('db.password');

    configValues.web = configReader.web;
    // configValues.web.port = get('web.port');
    // configValues.web.sessionSecret = get('web.sessionSecret');

    configValues.email = configReader.email;
    // configValues.email.fromNoReply = get('email.fromNoReply');

    configValues.auth = configReader.auth;
    // configValues.auth.useAuth = get('auth.useAuth');

    // configValues.auth.google = {};
    // configValues.auth.google.clientID = get('auth.google.clientID');
    // configValues.auth.google.clientSecret = get('auth.google.clientSecret');
    //
    // configValues.auth.facebook = {};
    // configValues.auth.facebook.clientID = get('auth.facebook.clientID');
    // configValues.auth.facebook.clientSecret = get('auth.facebook.clientSecret');

    configValues.format = configReader.format;
    // configValues.format.date = get('format.date');
    // configValues.format.year = get('format.year');
    // configValues.format.currencySymbol = get('format.currencySymbol');
}

function ensureConfigPath() {
    if (!process.env['NODE_CONFIG_DIR']) {
        let configPath = pathHelper.getDataRelative('config');
        process.env['NODE_CONFIG_DIR'] = configPath;
    }
}

export default configValues;