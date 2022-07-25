const axios = require('axios');
const express = require('express');
const responseTime = require('response-time');
const { promisify } = require('node:util');

const PORT = 7100;

const app = express();
app.use(responseTime());

const redis = require('redis');
const redisClient = redis.createClient({
    host: '127.0.0.1',
    port: 6379
});

redisClient.connect().then(() => console.log('Connected to redis!'));

redisClient.on('error', (err) => {
    console.log('Redis-Error', err);
});

console.log('redis-client', redisClient);

const GET_ASYNC = promisify(redisClient.get).bind(redisClient);
const SET_ASYNC = promisify(redisClient.set).bind(redisClient);
const REDIS_KEY = 'rockets';

app.get('/rockets', async (req, res, nxt) => {
    console.log('Fethcing rockets...');

    try {
        let data = await GET_ASYNC(REDIS_KEY);

        if (!data) {
            const result = await axios.get('https://api.spacexdata.com/v3/rockets');
            const saveResult = await SET_ASYNC(REDIS_KEY, JSON.stringify(result.data), 'EX', 5); // expires in 5 seconds.

            console.log('Data cached', saveResult);

            data = JSON.parse(result.data);
        } else console.log('Using cached data');

        res.send(result.data);
    } catch (err) {
        res.send(err.message);
    }

    console.log('Fethcing rockets... DONE!');
});

app.listen(PORT, () => {
    console.log(`Listening 🦻 on port ${PORT}...`);
});
