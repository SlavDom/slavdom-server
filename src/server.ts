import * as express from "express";
import * as path from "path";
import * as morgan from "morgan";
import * as bodyParser from "body-parser";
import * as webpack from "webpack";
import * as webpackMiddleware from "webpack-dev-middleware";
import * as webpackHotMiddleware from "webpack-hot-middleware";

import webpackConfig from "../../webpack.config.dev";
import router from "./routes";
import {initLogger, logInfo} from "./logger";
import dropAndSeedSchema from "../src/db/scripts/dropSchema";

const app = express();

function initWebpack(): void {
  const compiler = webpack(webpackConfig);
  app.use(webpackMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    noInfo: true,
    headers: {
      "Access-Control-Allow-Origin": "http://localhost",
    },
  }));
  app.use(webpackHotMiddleware(compiler));
}

/** Synchronizing database */
function initDB(): void {
  dropAndSeedSchema();
}

/** Function of Express initialisation */
function initExpress(): void {
  app.use(morgan("dev")); // log requests
  app.use(bodyParser.json()); // get information from html forms
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, "../../../client/public"))); // serve static files from public folder
  app.use("/", router);
  initDB();
}

/** Function that starts the server itself
 * @params options {any} options, that can be evaluated in the initialisation */
function start(): void {
  initLogger();
  initWebpack();
  initExpress();

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../../client/public/index.html"));
  });

  app.listen(3000, () => {
    logInfo("Server is listening on port 3000!");
  });
}

/** Starting module of the server
 * @module Starting server module */
export default {
  start,
};
