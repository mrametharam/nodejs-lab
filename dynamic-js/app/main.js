global.__cache = [];

const stringJs = require('./dynamic-js');
const { cacheData: cache, checkCache: chk, getData } = require('./helpers');

const djs = eval(stringJs);

let id = 0;

const runTest = () => {
    id++;
    data.id = id;

    djs(data, cache);

    const x = getData(id);
    console.log({ x });
};

const data = {
    user: 'kyle',
    role: 'admin',
    level: 3
};

setInterval(() => {
    runTest;
}, 9 * 1000);

runTest();

//setInterval(chk, 5 * 1000);

