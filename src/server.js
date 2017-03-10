// @flow
import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import _ from "lodash";
import config from "./config";
import pathHelper from "./helpers/pathHelper";
import routes from "./routes/routes";
import logger from "./logger";
import auth from "./auth/authInit";

const configuration = require('../data/config/default.json');
const app = express();

/** Starting module of the server
 * @module Starting server module */
export default {
    start
};

/** Function that starts the server itself
 * @params options {any} options, that can be evaluated in the initialisation */
function start(options: any) {
    
    initExpress();

    const passport = require('passport');

    routes.init(app, passport);

    //should be after routes.init
    initErrorHandling(app);

    app.listen(config.web.port, function () {
        console.log(`Server is listening on port ${config.web.port}!`);
    });
}

/** Function of Express initialisation */
function initExpress() {
    if (config.app.isDevLocal) app.use(morgan('dev')); //log requests

    app.use(bodyParser.json()); // get information from html forms
    app.use(bodyParser.urlencoded({extended: true}));

    app.use('/static', express.static(pathHelper.getRelative('../client/public')));

    app.use(compression());

    if (config.app.isDevLocal) app.use(cors());
    
    initDB();
    
    //NOTE following required for auth only

    initSession();

    initAuth();
}

/** Initialising of auth controllers */
function initAuth() {
    const flash = require('connect-flash');
    app.use(flash());

    const passport = require('passport');

    auth(passport);

    app.use(passport.initialize());
    app.use(passport.session()); // persistent login sessions

    return passport;
}

/** Synchronizing database */
function initDB() {
    // app.locals.db = dbInit.init();
    require('./tasks/syncDb');
}

/** Session initialisation */
function initSession() {
    const cookieParser = require('cookie-parser');
    app.use(cookieParser());

    const session = require('cookie-session');
    app.use(session({
        secret: config.web.sessionSecret
    }));
}

/** Error handling initializing */
function initErrorHandling(app: express.Application) {
    //log unhandled errors
    (app: any).use(function (err, req, res, next) {
        logger.error(err);

        console.log(err);

        let message = _.isError(err) ? err.message : err;
        message = config.app.isDevLocal ? message : 'Server Error';

        res.status(500).send({error: message});
    });

    process.on('uncaughtException', function (err) {
        logger.error(err);
    });
}