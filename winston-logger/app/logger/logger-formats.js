const printf = require('winston').format.printf;

//#region Custom log formats
const defaultConsoleFormat = printf(({ level, message, timestamp, stack, mainData, serverData, miscData }) => {
    let retVal = `${timestamp} [${level}]: ${stack || message} 
    => main:: ${JSON.stringify(mainData)}
    => server:: ${JSON.stringify(serverData)}
    => misc:: ${JSON.stringify(miscData)}
    `;

    return retVal;
});

const defaultFileFormat = printf(({ level, message, timestamp, stack, mainData, serverData, miscData }) => {
    // console.log({ level, message, timestamp, mainData, serverData, miscData });
    let retVal = '';
    let mainInfo = '';
    let serverInfo = '';
    let miscInfo = '';

    if (mainData) mainInfo = `${mainData.module ?? ''}.${mainData.function ?? ''} `;
    if (serverData) serverInfo = ` [${serverData.server ?? ''}:${serverData.vdn ?? ''}]`;
    if (miscData) miscInfo = `=> ${JSON.stringify(miscData)}`;

    retVal += `${timestamp} ${mainInfo}[${level}]:${serverInfo} ${stack || message} ${miscInfo}`;

    return retVal;
});

const debugFormat = printf((parms) => {
    console.log({ parms });
    const x = parms[Symbol.for('splat')];
    console.log(x[0]);
    console.log(x[1]);
    console.log(x[2]);

    return '';
});

// const defaultFormat = defaultConsoleFormat;
const defaultFormat = defaultFileFormat;
// const defaultFormat = debugFormat;
//#endregion

exports.defaultConsoleFormat = defaultFormat;
exports.defaultFileFormat = defaultFileFormat;
exports.debugFormat = debugFormat;
