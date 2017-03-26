import express from 'express';
import path from 'path';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import isError from 'lodash/isError';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import webpackConfig from '../../webpack.config.dev';
import config from './config';
import router from './routes';
import logger from './logger';
import dropAndSeedSchema from '../src/db/scripts/dropSchema';

const app = express();

function initWebpack() {
  const compiler = webpack(webpackConfig);
  app.use(webpackMiddleware(compiler, {
    hot: true,
    publicPath: webpackConfig.output.publicPath,
    noInfo: true,
  }));
  app.use(webpackHotMiddleware(compiler));
}

/** Synchronizing database */
function initDB() {
  dropAndSeedSchema();
}

/** Function of Express initialisation */
function initExpress() {
  app.use(morgan('dev')); // log requests
  app.use(bodyParser.json()); // get information from html forms
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, '../../client/public'))); // serve static files from public folder
  app.use('/', router);
  initDB();
}

/** Error handling initializing */
function initErrorHandling(app) {
  // log unhandled errors
  app.use((err, req, res) => {
    logger.error(err);
    const message = isError(err) ? err.message : err;
    res.status(500).send({ error: message });
  });

  process.on('uncaughtException', err => logger.error(err));
}

/** Function that starts the server itself
 * @params options {any} options, that can be evaluated in the initialisation */
function start() {
  initWebpack();
  initExpress();

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/public/index.html'));
  });

  initErrorHandling(app);

  app.listen(config.web.port, () => {
    console.log(`Server is listening on port ${config.web.port}!`);
  });
}

/** Starting module of the server
 * @module Starting server module */
export default {
  start,
};
