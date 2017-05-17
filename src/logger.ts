import * as fs from "fs";
import * as bunyan from "bunyan";
import * as Logger from "bunyan";

const databaseLogFolder = "server/logs/db.log";
const errorLogFolder = "server/logs/error.log";

function initLogger(): void {
  fs.writeFile(databaseLogFolder, "");
  fs.writeFile(errorLogFolder, "");
}

const errorLogger: Logger = bunyan.createLogger({
  name: "error",
  streams: [
    {
      stream: process.stdout,
      level: "error",
    },
    {
      path: errorLogFolder,
      level: "error",
    },
  ],
});

const databaseLogger: Logger = bunyan.createLogger({
  name: "database",
  streams: [
    {
      stream: process.stdout,
      level: "debug",
    },
    {
      path: databaseLogFolder,
      level: "debug",
    },
  ],
});

const infoLogger: Logger = bunyan.createLogger({
  name: "info",
  stream: process.stdout,
  level: "info",
});

function logError(error: Error) {
  errorLogger.error(error.message);
}

function logInfo(msg: string): void {
  infoLogger.info(msg);
}

function logDatabase(msg: string): void {
  databaseLogger.debug(msg);
}

export {
  logError,
  logInfo,
  logDatabase,
  initLogger,
};
