console.log('Child process created', process.pid);

// ? This is how a child process receives data from the parent.
process.on('message', (msg) => {
    console.log(msg, process.pid);

    let result = {};

    try {
        result = isPrime(msg);
    } catch (err) {
        console.log('ERR: child-message', err.message);
        result.isError = true;
        result.error = err.message;
    }

    result.pid = process.pid;

    // ? This is how to send data back to the parent.
    // ! process.send is only available on child processes. This is not available
    // ! in the parent process.
    process.send(result);

    // ? This just demonstrates that it is possible to send multiple messages back to the parent.
    // ! Watch out for circular paths!!!
    // process.send('Hello');
    // process.send('World');
    // process.send('!!!');

    // ! It is important to exit from the process when it is done.
    setTimeout(() => {
        console.log('Process terminated', process.pid);
        process.exit;
    }, 5000);
});

function isPrime(number) {
    const factors = [];
    let isPrime = false;

    for (let i = 2; i < number; i++) {
        if (number % i === 0) {
            //if (factors.length > 29) throw new Error('process is taking too long!');

            factors.push(i);
        }
    }

    isPrime = factors.length > 0 ? false : true;

    if (number < 1) isPrime = false;

    return { number, factors, isPrime };
}
