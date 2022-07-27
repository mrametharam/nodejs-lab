const axios = require('axios');

const acdData = {
    callid: 'this.getCallID()',
    ucid: 'this.getUCID()',
    distributingvdn: 'this.getVDN()',
    EventCause: 'this.getEventCause()',
    calleddevice: 'this.getCalledDevice()',
    callingdevice: 'this.getCallingDevice()',
    uui: 'this.getUUI()',
    distributingdevice: 'this.getDistributingDevice()',
    reason: 'this.getReason()',
    acdcall: 'this.getACDCall()',
    skillExt: 'this.getACD()',
    phonenumber: 'this.getCallingDevice()'
};

const jsScript = `
const { status, data } = await axios.get('https://random-data-api.com/api/users/random_user');
console.log("Status", status);
console.log("axios-data", data);
console.log('DeliveredEventFn START...', JSON.stringify(inData), 'DeliveredEventFn END');
throw Error("Crash test!!!");`;

const jsScriptOld = `
let status = -1;
let data = {};

axios
    .get('https://random-data-api.com/api/users/random_user')
    .then((result) => {
        status = result.status;
        data = result.data;

        console.log('Status', status);
        console.log('axios-data', data);
        console.log('DeliveredEventFn START...', JSON.stringify(inData), 'DeliveredEventFn END');
        throw Error('Crash test!!!');
    })
    .catch((err) => {
        console.error(err);
    });

`

const jsWrapper = `
try {
    ${jsScriptOld}
} catch (err) {
    console.error(err);
}
`;

const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;

async function test(inData, axios) {
    try {
        let status = -1;
        let data = {};

        axios
            .get('https://random-data-api.com/api/users/random_user')
            .then((result) => {
                status = result.status;
                data = result.data;

                console.log('Status', status);
                console.log('axios-data', data);
                console.log('DeliveredEventFn START...', JSON.stringify(inData), 'DeliveredEventFn END');
                throw Error('Crash test!!!');
            })
            // .catch((err) => {
            //     console.error(err);
            // });
    } catch (err) {
        console.error("ERRORXXX", err);
    }
}

async function main() {
    // test(acdData, axios);

    const runJs = new AsyncFunction('inData, axios', jsWrapper);
    runJs(acdData, axios);

    //    console.log(jsWrapper);
}

main();
