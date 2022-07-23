//#region Load packages
const { format, transports } = require('winston');
require('winston-daily-rotate-file');
//#endregion

//#region Load modules
const customFormats = require('./logger-formats');
//#endregion

const { logOptions } = __config;
const { colorize, combine, errors, json, timestamp } = format;

const FILE_DATE_PATTERN = 'DD'; //'YYYY-MM-DD-HH-mm',
const DEFAULT_LOG_LEVEL = 'info';

const timeFormat = { format: 'HH:mm:ss' };

const logFilePath = logOptions.logFilePath;
const LogFileMaxAge = logOptions.maxFileAge;
const logFileMaxSize = logOptions.maxFileSize;
const printStack = logOptions.printStack;
const auditLogFile = `${logFilePath}/audit.json`;

//#region Define filenames
const MAIN_FILE_NAME = 'main-%DATE%.log';
const ERROR_FILE_NAME = 'error-%DATE%.log';
const CRASH_FILE_NAME = 'crash-%DATE%.log';
const CTI_FILE_NAME = 'cti-%DATE%.log';
//#endregion

//#region Define different format data
let fileFormatData = '';

if (__config.appMode == 'local')
    fileFormatData = combine(timestamp(timeFormat), errors({ stack: printStack }), customFormats.defaultFileFormat);
else fileFormatData = combine(timestamp(timeFormat), errors({ stack: printStack }), json());

const consoleFormatData = combine(
    colorize(),
    timestamp(timeFormat),
    errors({ stack: printStack }),
    customFormats.defaultConsoleFormat
);
//#endregion

//#region Configure transports
const mainLogFileTransport = new transports.DailyRotateFile({
    format: fileFormatData,
    filename: `${logFilePath}${MAIN_FILE_NAME}`,
    datePattern: FILE_DATE_PATTERN,
    zippedArchive: false,
    maxSize: logFileMaxSize,
    maxFiles: LogFileMaxAge,
    auditFile: auditLogFile,
    level: DEFAULT_LOG_LEVEL
});

const errorLogFileTransport = new transports.DailyRotateFile({
    format: fileFormatData,
    filename: `${logFilePath}${ERROR_FILE_NAME}`,
    datePattern: FILE_DATE_PATTERN,
    zippedArchive: false,
    maxSize: logFileMaxSize,
    maxFiles: LogFileMaxAge,
    auditFile: auditLogFile,
    level: 'error'
});

const crashLogFileTransport = new transports.DailyRotateFile({
    format: fileFormatData,
    filename: `${logFilePath}${CRASH_FILE_NAME}`,
    datePattern: FILE_DATE_PATTERN,
    zippedArchive: false,
    maxSize: logFileMaxSize,
    maxFiles: LogFileMaxAge,
    auditFile: auditLogFile
});

const consoleLogTransport = new transports.Console({
    format: consoleFormatData,
    level: 'debug'
});

const ctiLogFileTransport = new transports.DailyRotateFile({
    format: fileFormatData,
    filename: `${logFilePath}${CTI_FILE_NAME}`,
    datePattern: FILE_DATE_PATTERN,
    zippedArchive: false,
    maxSize: logFileMaxSize,
    maxFiles: LogFileMaxAge,
    auditFile: auditLogFile,
    level: DEFAULT_LOG_LEVEL
});
//#endregion

//#region Exports
exports.mainLogFileTransport = mainLogFileTransport;
exports.errorFileTransport = errorLogFileTransport;
exports.crashLogFileTransport = crashLogFileTransport;
exports.consoleLogTransport = consoleLogTransport;
exports.ctiLogFileTransport = ctiLogFileTransport;
//#endregion
