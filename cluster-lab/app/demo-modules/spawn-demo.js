// This module shows how to execute an external command, display the results and errors.
const { spawn } = require('node:child_process');
const cmd = spawn('dir', ['-l']);   // change the -l to /w to throw an error.

cmd.stdout.on('data', (data) => {
    console.log('>> ' + data);
});

cmd.stderr.on('data', (err) => {
    console.error('ERR: ' + err.toString());
});

cmd.on('exit', (code) => {
    console.log('>>> Terminal existed with ' + code + ' <<<');
});
