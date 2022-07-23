require('./initialize');
require('./logger/logger-setup');

const { loggers } = require('winston');

const mainlogger = loggers.get('main');
const ctiogger = loggers.get('cti');

const moduleInfo = { module: 'main' };

function mainLogTest() {
    const miscData = { userId: '001', name: 'kyle', role: 'admin' };
    const miscData1 = { userId: '001', name: 'kyle', role: 'admin' };
    const miscData2 = { username: 'owa', level: 3 };

    const serverData = { server: 'aes1', vdn: 77700 };
    const serverData1 = { server: 'aes1', vdn: 77700 };
    const serverData2 = { vdn: 77700 };
    const serverData3 = { server: 'aes1' };

    const mainData = { function: 'mainLogTest', ...moduleInfo };
    const mainData1 = { function: 'mainLogTest', ...moduleInfo };
    const mainData2 = moduleInfo;
    const mainData3 = { function: 'mainLogTest' };

    let data = { mainData, serverData, miscData };

    let data1 = {};
    data1.mainData = mainData1;
    data1.serverData = serverData1;
    data1.miscData = miscData1;

    let data2 = {};
    data2.mainData = mainData2;
    data2.serverData = serverData2;
    data2.miscData = miscData2;

    let data3 = {};
    data3.mainData = mainData3;
    data3.serverData = serverData3;
    data3.miscData = miscData1;

    let data4 = {};
    data4.mainData = mainData2;

    // console.log({ data, data4 });

    try {
        console.log('\n\nWriting MAIN logs\n');

        mainlogger.info('======', mainData, serverData, miscData);
        mainlogger.error('Error log!', data4);
        mainlogger.warn('Warning log!', data3);
        mainlogger.info('Information#1 log!', data1);
        mainlogger.info('Information#2 log!', data2);
        mainlogger.info('Information#3 log!', data3);
        mainlogger.info('Information#4 log!', data4);
        mainlogger.debug('debug log!', data4);
        mainlogger.silly('silly log!', data2);

        throw new Error('Oops! I crashed!!!');
    } catch (err) {
        mainlogger.error(err, data1);
    }

    setTimeout(mainLogTest, 15 * 1000);
}

function ctiLogTest() {
    const mainData = { function: 'ctiLogTest', ...moduleInfo };
    const serverData = { server: 'aes1', vdn: 77700 };
    const miscData = { userId: '001', name: 'kyle', role: 'admin' };

    const data = { mainData, serverData, miscData };

    try {
        console.log('\n\nWriting CTI logs\n');

        ctiogger.info('======');
        ctiogger.error('Error log!', data);
        ctiogger.warn('Warning log!', data);
        ctiogger.info('Information log!', data);
        ctiogger.debug('debug log!', data);
        ctiogger.silly('silly log!', data);
        ctiogger.log('info', 'log-info', data, subData);

        throw new Error('Oops! I crashed!!!');
    } catch (err) {
        ctiogger.error(err, data);
    }

    setTimeout(ctiLogTest, 15 * 1000);
}

mainLogTest();
ctiLogTest();
