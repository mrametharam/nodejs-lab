require('./web-service/api-service');

// require('./demo-modules/spawn-demo');

process.on('uncaughtException', (err) => {
    console.log('uncaughtException');
    console.log(err);
});
