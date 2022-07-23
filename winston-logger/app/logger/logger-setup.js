//? Log Levels
//? ===========
//? 0: error
//? 1: warning
//? 2: information
//? 3: http
//? 4: verbose
//? 5: debug
//? 6: silly

//#region Load packages
const { loggers } = require('winston');
//#endregion

//#region Load modules
const { ctiLogFileTransport } = require('./logger-transports');
const { mainLogFileTransport, errorFileTransport, crashLogFileTransport, consoleLogTransport } = require('./logger-transports');
//#endregion

//#region Define loggers
const mainLogOptions = {
    // format: logData,
    transports: [mainLogFileTransport, errorFileTransport, consoleLogTransport],
    exceptionHandlers: [crashLogFileTransport, consoleLogTransport]
};

const ctiLogOptions = {
    // format: logData,
    transports: [ctiLogFileTransport, errorFileTransport],
    exceptionHandlers: [crashLogFileTransport, consoleLogTransport]
};

loggers.add('main', mainLogOptions);
loggers.add('cti', ctiLogOptions);
//#endregion