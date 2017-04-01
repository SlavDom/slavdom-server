import intel from 'intel';
import * as _ from 'lodash';

function init() {
  intel.config({
    formatters: {
      simple: {
        format: '[%(levelname)s] %(message)s',
        colorize: true,
      },
      details: {
        format: '[%(date)s] %(name)s.%(levelname)s: %(message)s',
        strip: true,
      }
    },
    handlers: {
      terminal: {
        class: intel.handlers.Console,
        formatter: 'simple',
        level: intel.VERBOSE,
      },
      logErrors: {
        class: intel.handlers.File,
        level: intel.ERROR,
        file: 'server/data/logs/error.log',
        formatter: 'details',
      },
      logDatabase: {
        class: intel.handlers.File,
        level: intel.DEBUG,
        file: 'server/data/logs/db.log',
        formatter: 'details',
      },
    },
    loggers: {
      root: {
        handlers: ['terminal'],
        level: intel.INFO,
        handleExceptions: true,
        exitOnError: false,
        propagate: false,
      },
      'root.db': {
        handlers: ['logDatabase'],
        level: intel.DEBUG,
      },
      'root.err': {
        handlers: ['logErrors'],
        level: intel.ERROR,
      },
    },
  });
}

init();

function logError(err) {
  if (_.isError(err)) {
    const logger = intel.getLogger('root.err');
    logger.error(err);
  }
}

function logInfo(msg) {
  const logger = intel.getLogger('root');
  logger.info(msg);
}

function logDatabase(msg) {
  const logger = intel.getLogger('root.db');
  logger.debug(msg);
}

export {
  logError,
  logInfo,
  logDatabase,
};
