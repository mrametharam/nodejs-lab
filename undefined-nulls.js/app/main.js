console.log('App is running...');

const x = {
    test: true
};
const y = {
    test: false
};
const z = {
    testz: true
};

if (x.test) console.log('x', x.test);

if (y.test) console.log('y', y.test);

console.log("z", z.test);
if (!z.test) console.log('z', z.test);

let check = x.test;

console.table({ isnull: check });

console.log('\nequals check');
console.log('== null', check == null);
console.log('=== null', check === null);

console.log('== undefined', check == undefined);
console.log('=== undefined', check === undefined);

console.log('\nnot equals check');
console.log('!= null', check != null);
console.log('!== null', check !== null);

console.log('!= undefined', check != undefined);
console.log('!== undefined', check !== undefined);

console.log('\nnot');
console.log('!', !check);

console.log('\nor');
console.log('!', check || 100); // if check = false, null, undefined, or 0 then use 100.

console.log("\n\nThat's all folks!!!");
