const LoggerTypes = {
    Info: 'info',
    Debug: 'debug',
    Warning: 'warning',
    Success: 'success',
    Error: 'error',
    Critical: 'critical',
};

class Logger {
    constructor(appName, version) {
        this.enabled = true;
        this.enabledTypes = new Set([
            LoggerTypes.Info,
            LoggerTypes.Debug,
            LoggerTypes.Warning,
            LoggerTypes.Success,
            LoggerTypes.Error,
            LoggerTypes.Critical,
        ]);
        this.appName = appName;
        this.version = version;
    }

    log(type, code, action, message) {
        if (!this.enabled || !this.enabledTypes.has(type)) {
            return;
        }

        let logColor;
        let logLabel;

        switch (type) {
            case LoggerTypes.Info:
                logColor = '\x1b[34m';
                logLabel = '[INFO]';
                break;
            case LoggerTypes.Debug:
                logColor = '\x1b[33m';
                logLabel = '[DEBUG]';
                break;
            case LoggerTypes.Warning:
                logColor = '\x1b[35m';
                logLabel = '[WARNING]';
                break;
            case LoggerTypes.Success:
                logColor = '\x1b[32m';
                logLabel = '[SUCCESS]';
                break;
            case LoggerTypes.Critical:
                logColor = '\x1b[41m';
                logLabel = '[CRITICAL]';
                break;
            case LoggerTypes.Error:
                logColor = '\x1b[31m';
                logLabel = '[ERROR]';
                break;
            default:
                throw new Error(`Unknown log type: ${type}`);
        }

        const timestamp = new Date().toISOString();
        const logMessage = `${logColor}${logLabel} [${timestamp}] ${this.appName} v${this.version} (${code}) ${action}: ${message}\x1b[0m`;
        console.log(logMessage);
    }

    initialize(appName, version) {
        this.appName = appName;
        this.version = version;
        this.success(0, 'Logger initialized', 'Logger initialized successfully.');
    }

    info(code, action, message) {
        this.log(LoggerTypes.Info, code, action, message);
    }

    debug(code, action, message) {
        this.log(LoggerTypes.Debug, code, action, message);
    }

    warning(code, action, message) {
        this.log(LoggerTypes.Warning, code, action, message);
    }

    success(code, action, message) {
        this.log(LoggerTypes.Success, code, action, message);
    }

    error(code, action, message) {
        this.log(LoggerTypes.Error, code, action, message);
    }

    critical(code, action, message) {
        this.log(LoggerTypes.Critical, code, action, message);
    }

    customLog(type, code, action, message) {
        if (!Object.values(LoggerTypes).includes(type)) {
            throw new Error(`Unknown log type: ${type}`);
        }
        this.log(type, code, action, message);
    }

    enable() {
        this.enabled = true;
    }

    disable() {
        this.enabled = false;
    }

    enableType(type) {
        if (!this.enabledTypes.has(type)) {
            this.enabledTypes.add(type);
        }
    }

    disableType(type) {
        this.enabledTypes.delete(type);
    }
}

module.exports = { Logger, LoggerTypes };