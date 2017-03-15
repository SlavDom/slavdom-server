import express from "express";
import path from 'path';
import morgan from "morgan";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import _ from "lodash";
import webpack from "webpack";
import webpackMiddleware from "webpack-dev-middleware";

import webpackConfig from '../../webpack.config.dev'
import config from "./config";
import pathHelper from "./helpers/pathHelper";
import routes from "./routes/routes";
import logger from "./logger";
import auth from "./auth/authInit";

const app = express();

/** Starting module of the server
 * @module Starting server module */
export default {
  start
};

/** Function that starts the server itself
 * @params options {any} options, that can be evaluated in the initialisation */
function start() {

  app.use(webpackMiddleware(webpack(webpackConfig)));

  initExpress();

  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/public/index.html'));
  });

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
  app.use(morgan('dev')); //log requests
  app.use(bodyParser.json()); // get information from html forms
  app.use(bodyParser.urlencoded({extended: true}));
  app.use('/static', express.static(pathHelper.getRelative('../client/public')));
  app.use(compression());
  app.use(cors());

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
  require('./db/index');
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
function initErrorHandling(app) {
  //log unhandled errors
  app.use((err, req, res) => {
    logger.error(err);
    let message = _.isError(err) ? err.message : err;
    res.status(500).send({error: message});
  });

  process.on('uncaughtException', function (err) {
    logger.error(err);
  });
}