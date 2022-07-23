//#region  Load the environment variables.
const appMode = (process.env.mode ?? 'prod').toLowerCase();
//#endregion

//#region  Load the configuration file
const fs = require('node:fs');
const configFile = `${process.cwd()}/config/${appMode}-settings.json`;
console.log({ configFile });

global.__config = {};

if (fs.existsSync(configFile)) {
    __config = require(configFile);

    console.log('Config file loaded');
} else console.log('No configuration file found');
//#endregion

//#region Set configuration defaults
const DEFAULT_LOG_FILE_PATH = `/logs/`;
const DEFAULT_LOG_PRINT_STACK = false;
const DEFAULT_LOG_MAX_FILE_AGE = '1d';
const DEFAULT_LOG_MAX_FILE_SIZE = '50m';

if (!__config.logOptions) __config.logOptions = {};

const { logOptions } = __config;
logOptions.logFilePath = logOptions.logFilePath ?? DEFAULT_LOG_FILE_PATH;
logOptions.printStack = logOptions.printStack ?? DEFAULT_LOG_PRINT_STACK;
logOptions.maxFileAge = logOptions.maxFileAge ?? DEFAULT_LOG_MAX_FILE_AGE;
logOptions.maxFileSize = logOptions.maxFileSize ?? DEFAULT_LOG_MAX_FILE_SIZE;

logOptions.logFilePath += logOptions.logFilePath.endsWith('/') ? '' : '/';
//#endregion

//#region  Check the command line arguments and assign them to the global object as well.
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv)).argv;
// console.log({ argv });

__config.useRedis = argv.redis ?? true; // --no-redis
__config.sendEmailAlerts = argv.emailAlerts ?? true; // no-email-alerts
//#endregion

__config.appMode = appMode;

console.log({ __config });
