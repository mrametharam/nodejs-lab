console.log('Running WebDev Simplified demo');

const responseTime = require('response-time');
const express = require('express');
const Redis = require('ioredis');
const axios = require('axios');
//const redis = require("redis");
const cors = require('cors');

// const redisClient = redis.createClient();
const redisClient = new Redis();

redisClient.on('error', (err) => {
    console.log('Redis-Error', err);
});

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(responseTime());

app.get('/photos', async (req, res) => {
    const startTime = new Date().getTime();
    const albumId = req.query.albumId;
    const usedCached = (req.query.usedCached ?? 1) == 1;

    try {
        console.log(`Fetchin photos with albumId=${albumId ?? -1}...`, albumId, usedCached);

        if (usedCached) {
            const photos = await redisClient.get(`photos?albumId=${albumId}`);

            if (photos) {
                console.log('Data from Redis');
                return res.json(JSON.parse(photos));
            }

            console.log("No data found in cache. Fetching from server.");
        }

        const { data } = await axios.get('https://jsonplaceholder.typicode.com/photos', {
            params: { albumId }
        });

        redisClient.set(`photos?albumId=${albumId}`, JSON.stringify(data), 'EX', 300);

        res.json(data);
        console.log('Data from API');

        //#region Using callbacks
        // await redisClient.get(`photos?albumId=${albumId}`, async (err, photos) => {
        //     console.log('Test');
        //     if (err) console.log('ERROR!', err);

        //     if (photos != null) {
        //         return res.json(JSON.parse(photos));
        //     }

        //     const { data } = await axios.get('https://jsonplaceholder.typicode.com/photos', {
        //         params: { albumId }
        //     });

        //     redisClient.set(`photos?albumId=${albumId}`, JSON.stringify(data), "EX", 300);

        //     res.json(data);
        // });
        //#endregion
    } catch (err) {
        console.log('ERROR!', err);
    }

    const endTime = new Date().getTime();
    const elapsedTime = endTime - startTime;

    console.log(`Fetchin photos with albumId=${albumId ?? -1}... DONE! ${elapsedTime}ms`);
});

app.get('/photos/:id', async (req, res) => {
    console.log(`Fetchin photo ${req.params.id}...`);

    const { data } = await axios.get(`https://jsonplaceholder.typicode.com/photos/${req.params.id}`);

    res.json(data);

    console.log(`Fetchin photo ${req.params.id}... DONE!`);
});

app.listen(7200, console.log('Listening on port 7200...'));
