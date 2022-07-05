const { fork } = require('node:child_process');

const express = require('express');
const app = express();

const rootController = (req, res) => {
    const inNumber = req.params.number ?? 1;
    console.log('Root hit', inNumber);

    // const result = isPrime(inNumber);

    // ? This runs a module in another process.
    // ! The path needs to be an absolute path.
    const child = fork('app/modules/check-prime.js');

    // ? This is how to receive data from the child process.
    child.on('message', (msg) => {
        console.log('Sending back...', msg, child.pid);
        res.status(201).json(msg);
    });

    // ! I can't get this thing to work!!!
    child.on('error', (err) => {
        console.log('child-err');
        console.log('ERR: parent', err, child.pid);
    });

    // ? This is how to know when a child process ends.
    child.on('exit', (code) => {
        console.log('Child process has terminated.', code, child.pid);
    });

    // ? This is how to send data to the child process.
    child.send(inNumber);

    //res.status(201).json(result);
    console.log("That's all folks!!!", process.pid);
};

app.get('/:number?', rootController);

app.listen(7300, () => console.log('Listening on port 7300...'));

// This function was moved to its own module.
// function isPrime(number) {
//     const factors = [];
//     let isPrime = false;

//     for (let i = 2; i < number; i++) {
//         if (number % i === 0) {
//             factors.push(i);
//         }
//     }

//     isPrime = factors.length > 0 ? false : true;

//     if (number < 1) isPrime = false;

//     return { number, factors, isPrime };
// }
