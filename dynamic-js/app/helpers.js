const cacheData = (cData) => {
    const newData = { id: cData.id, __expires: new Date().getTime() + 13 * 1000, data: JSON.stringify(cData) };

    console.log('Saved!', newData);

    __cache.push(newData);
};

const checkCache = () => {
    if (__cache.length < 1) {
        console.log('Cache is empty.');
        return;
    }

    const now = new Date().getTime();

    for (let i = 0; i < __cache.length; i++) {
        const d = __cache[i];

        if (now > d.__expires) {
            console.log('Expired!', { d });
            __cache.splice(i, 1);
        }
    }

    console.log('\n', { __cache }, '\n');
};

const getData = (id) => {
    let retVal = null;
    const method = 1;

    if (method == 1) {
        for (let index = 0; index < __cache.length; index++) {
            const element = __cache[index];
            if (element.id == id) {
                console.log({ element });
                retVal = element;
                break;
            }
        }
    } else if (method == 2) {
        
    }
    
    return retVal;
};

module.exports = { cacheData, checkCache, getData };
