const app = require('express')();
const fs = require('node:fs');
const v8 = require('node:v8');

function createHeapSnapshot() {
    const filename = `${Date.now()}.heapsnapshot`;
    v8.writeHeapSnapshot(filename);

    return filename;
}

app.get('/heapdump', async (req, res) => {
    const dumpFile = createHeapSnapshot();

    return res.download(dumpFile);
});

app.listen(7000, console.log('Listening on port 7000'));
