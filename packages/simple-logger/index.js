const LEVELS = {
  info: 'INFO',
  warn: 'WARN',
  error: 'ERROR',
};

const logger = {
  _log: (level, text) => {
    console.log(`[${level}]: ${text}`);
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
