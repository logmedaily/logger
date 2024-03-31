const { Logger, LoggerTypes } = require('../lib');

describe('Logger Logger', () => {
    let logger;
    let consoleOutput = [];

    beforeAll(() => {
        console.log = jest.fn((...args) => {
            consoleOutput.push(args);
        });
    });

    beforeEach(() => {
        logger = new Logger('TestApp', '1.0');
        consoleOutput = [];
    });

    test('Log info message', () => {
        logger.info(200, 'Testing', 'This is an info log');
        expect(consoleOutput[0][0]).toContain('[INFO]');
        expect(consoleOutput[0][0]).toContain('TestApp v1.0 (200) Testing: This is an info log');
    });

    test('Disable debug', () => {
        logger.disableType(LoggerTypes.Debug);
        logger.debug(200, 'Testing', 'This is a debug log');
        expect(consoleOutput.length).toBe(0);
    });

    test('Log critical message', () => {
        logger.critical(200, 'Testing', 'This is a critical log');
        expect(consoleOutput[0][0]).toContain('[CRITICAL]');
        expect(consoleOutput[0][0]).toContain('TestApp v1.0 (200) Testing: This is a critical log');
    });

    test('Logger initialization', async () => {
        logger.initialize('NewApp', '2.0');
        expect(consoleOutput[0][0]).toContain('[SUCCESS]');
        expect(consoleOutput[0][0]).toContain('[SUCCESS]');
    });

    test('Disable logger', () => {
        logger.disable();
        logger.info(200, 'Testing', 'This is an info log'); // This should not log anything
        expect(consoleOutput.length).toBe(0);
    });

    test('Enable logger', () => {
        logger.disable();
        logger.enable();
        logger.info(200, 'Testing', 'This is an info log');
        expect(consoleOutput[0][0]).toContain('[INFO]');
        expect(consoleOutput[0][0]).toContain('TestApp v1.0 (200) Testing: This is an info log');
    });

    test('Disable log type', () => {
        logger.disableType(LoggerTypes.Debug); // Disable debug logs
        logger.debug(200, 'Testing', 'This is a debug log'); // This should not log anything
        expect(consoleOutput.length).toBe(0);
    });

    test('Enable log type', () => {
        logger.disableType(LoggerTypes.Debug); // Disable debug logs
        logger.enableType(LoggerTypes.Debug); // Enable debug logs
        logger.debug(200, 'Testing', 'This is a debug log');
        expect(consoleOutput[0][0]).toContain('[DEBUG]');
        expect(consoleOutput[0][0]).toContain('TestApp v1.0 (200) Testing: This is a debug log');
    });



    test('Log with different log types', () => {
        logger.debug(200, 'Testing', 'This is a debug log');
        logger.info(200, 'Testing', 'This is an info log');
        logger.warning(300, 'Testing', 'This is a warning log');
        logger.error(400, 'Testing', 'This is an error log');
        logger.critical(500, 'Testing', 'This is a critical log');
        expect(consoleOutput.length).toBe(5);
    });

    test('Log with non-existing log type', () => {
        const unknownType = 'UnknownType';
        expect(() => {
            logger.customLog(unknownType, 200, 'Testing', 'This is a log with non-existing type');
        }).toThrowError(`Unknown log type: ${unknownType}`);
    });

    test('Custom Info Log', () => {
        logger.customLog('info', 200, 'Testing', 'This is a custom log interface');
        expect(consoleOutput[0][0]).toContain('[INFO]');
        expect(consoleOutput[0][0]).toContain('TestApp v1.0 (200) Testing: This is a custom log interface');
    });

    test('throws error on unknown log type', () => {
        expect(() => {
            logger.customLog('unknownLogType', 200, 'Testing', 'Test message');
        }).toThrowError('Unknown log type: unknownLogType');
    });
});