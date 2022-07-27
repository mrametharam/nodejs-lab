global.__cache = [];

const stringJs = require('./dynamic-js');
const { cacheData: cache, checkCache: chk } = require('./helpers');

const djs = eval(stringJs);

let id = 0;

const data = {
    user: 'kyle',
    role: 'admin',
    level: 3
};

setInterval(() => {
    id++;
    data.id = id;

    djs(data, cache);
}, 9 * 1000);

setInterval(chk, 5 * 1000);
