console.log('AppMode:', process.env['app-mode']);
// console.log("Args:", process.argv)
console.log('Args:', process.argv.slice(2));
console.log('ignore-redis:', process.argv['ignore-redis']);

const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv)).argv;
console.log({ argv });
const config = {
    ignoreRedis: argv.ignoreRedis,
    xYyZzz: argv.xYyZzz,
    isY: argv.y,
    test: argv.unknown ?? false,
    useDbApi: argv.dbapi ?? true,
    ports: argv.px ?? []
};

console.log({ config });
