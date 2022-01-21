const LEVELS = {
  debug: 'DEBUG',
  info: 'INFO',
  warn: 'WARN',
  error: 'ERROR',
};

const logger = {
  _log: (level, text) => {
    console.log(`[${level}]: ${text}`);
  },
  DEBUG: (text) => {
    logger._log(LEVELS.debug, text);
  },
  INFO: (text) => {
    logger._log(LEVELS.info, text);
  },
  WARN: (text) => {
    logger._log(LEVELS.warn, text);
  },
  ERROR: (text) => {
    logger._log(LEVELS.error, text);
  },
};

module.exports = {
  logger,
};
