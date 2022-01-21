const { logger } = require('./index');

describe('simple-logger', () => {
  test('it correctly exports the logger', () => {
    expect(logger).toHaveProperty('_log');
    expect(logger).toHaveProperty('DEBUG');
    expect(logger).toHaveProperty('INFO');
    expect(logger).toHaveProperty('WARN');
    expect(logger).toHaveProperty('ERROR');
  });

  test('it logs correctly', () => {
    const consoleMock = jest.spyOn(console, 'log').mockImplementation(() => {});

    logger.DEBUG('debug message');
    expect(consoleMock).toHaveBeenCalledWith(`[DEBUG]: debug message`);
    logger.INFO('info message');
    expect(consoleMock).toHaveBeenCalledWith(`[INFO]: info message`);
    logger.WARN('warn message');
    expect(consoleMock).toHaveBeenCalledWith(`[WARN]: warn message`);
    logger.ERROR('error message');
    expect(consoleMock).toHaveBeenCalledWith(`[ERROR]: error message`);
  });
});
