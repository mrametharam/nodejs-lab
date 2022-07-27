const sampleJs = `async (__data, __saveData) => {
    //console.log({ __data });

    __data.level++;

    __saveData(__data)

    //console.log({ __data });
};`;

module.exports = sampleJs;