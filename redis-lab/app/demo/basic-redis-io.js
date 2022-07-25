const Redis = require('ioredis');

const redisConn = {
    port: 6379,
    host: '127.0.0.1',
    db: '2'
};

const redis = new Redis(redisConn);
const pub = new Redis(redisConn);

async function main() {
    const objVal = { username: 'kyle', role: 'admin' };
    let key = '';
    let rawVal = '';
    let newObjVal = {};

    //#region Basic Read-Write
    key = 'basic';
    await redis.set(key, JSON.stringify(objVal));

    rawVal = await redis.get(key);
    newObjVal = JSON.parse(rawVal);

    console.log(key, { newObjVal });
    //#endregion

    //#region Read-Write with expiration (10 seconds)
    key = 'basic-ex';
    await redis.set(key, JSON.stringify(objVal), 'EX', 10);

    rawVal = await redis.get(key);
    newObjVal = JSON.parse(rawVal);

    console.log(key, { newObjVal });
    //#endregion

    // Save an array
    key = 'array';
    await redis.zadd(key, 3, 7, 4, 1, 2, 5);
}

function publisher() {
    const message = { foo: Math.random() };

    const channel = `my-channel-${1 + Math.round(Math.random())}`;

    pub.publish(channel, JSON.stringify(message));

    console.log('Published', { message }, { channel });
}

function subscriber() {
    const sub = new Redis(redisConn);
    sub.subscribe('my-channel-1', 'my-channel-2', (err, count) => {
        if (err) {
            console.log(err);
        } else {
            console.log('This client is subscribed to ' + count + ' channels.');
        }
    });

    sub.on('message', (channel, data) => {
        console.log('Received ' + data + ' from ' + channel);
    });
}

main();
subscriber();

setInterval(() => {
    publisher();
}, 1500);

console.log('Done!');
