// import intel from 'intel';
import * as _ from "lodash";
import * as fs from "fs";

function init() {
  process.stdout.write("\x1Bc");
  fs.writeFile("server/data/logs/db.log", "");
  fs.writeFile("server/data/logs/error.log", "");
  // intel.config({
  //   formatters: {
  //     simple: {
  //       format: '[%(levelname)s] %(message)s',
  //       colorize: true,
  //     },
  //     details: {
  //       format: '[%(date)s] %(name)s.%(levelname)s: %(message)s',
  //       strip: true,
  //     },
  //   },
  //   handlers: {
  //     terminal: {
  //       class: intel.handlers.Console,
  //       formatter: 'simple',
  //       level: intel.VERBOSE,
  //     },
  //     logErrors: {
  //       class: intel.handlers.File,
  //       level: intel.ERROR,
  //       file: 'server/data/logs/error.log',
  //       formatter: 'details',
  //     },
  //     logDatabase: {
  //       class: intel.handlers.File,
  //       level: intel.DEBUG,
  //       file: 'server/data/logs/db.log',
  //       formatter: 'details',
  //     },
  //   },
  //   loggers: {
  //     root: {
  //       handlers: ['terminal'],
  //       level: intel.INFO,
  //       handleExceptions: true,
  //       exitOnError: false,
  //       propagate: false,
  //     },
  //     'root.db': {
  //       handlers: ['logDatabase'],
  //       level: intel.DEBUG,
  //     },
  //     'root.err': {
  //       handlers: ['logErrors'],
  //       level: intel.ERROR,
  //     },
  //   },
  // });
}

init();

function getErrorMessage(error) {
  if (!error) {
    return "";
  }

  if (error.isAppError) {
    if (!error.message) {
      let message = `error.${error.type}.${error.code}.${error.data}`;
      if (!message) {
        message = `Cannot find error message for type:${error.type} code:${error.code}`;
      }
      error.message = message;
    }
    if (error.uiShow) {
      return error.message;
    }
  }

  return error.message || error;
}

function logError(err) {
  const message = getErrorMessage(err);
  if (_.isError(err)) {
    // const logger = intel.getLogger('root.err');
    // logger.error(message);
  }
  return message;
}

function logInfo(msg) {
  // const logger = intel.getLogger('root');
  // logger.info(msg);
  return msg;
}

function logDatabase(msg) {
  // const logger = intel.getLogger('root.db');
  // logger.debug(msg);
  return msg;
}

export {
  logError,
  logInfo,
  logDatabase,
};
