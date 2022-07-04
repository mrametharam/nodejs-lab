const express = require('express');
const app = express();

console.log("Env", process.env.app_mode);

console.log('Server started...');

app.get('/', (req, res) => {
    console.log('Root path hit', process.pid);
    res.send('Welcome to the testing API! ' + process.pid.toString());
});

app.get('/kill', (req, res) => {
    console.log('Received kill request.', process.pid);
    res.send('Service stopped!' + process.pid.toString());
    process.exit();
});

app.listen(7200, () => console.log('Listening on port 7200...'));
