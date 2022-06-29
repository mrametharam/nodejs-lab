console.log('App is running...');

let check = 0; //null or undefined or a valid value

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
console.log('!', check || 100);     // if check = false, null, undefined, or 0 then use 100.

console.log("\n\nThat's all folks!!!");
