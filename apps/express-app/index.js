const express = require('express');
const morgan = require('morgan');
const { logger } = require('@monorepo/simple-logger');
const { name, version } = require('./package.json');
const env = process.env.NODE_ENV;

const app = express();
app.use(morgan('combined'));
const port = process.env.PORT || 3000;

app.get('/', (_, res) => {
  res.json({ ok: 'true', name, version });
});

if (env !== 'test') {
  app.listen(port, () => {
    logger.DEBUG(`${name} running in env ${env}`);
    logger.INFO(`${name} listening at http://localhost:${port}`);
  });
}

module.exports = app;
