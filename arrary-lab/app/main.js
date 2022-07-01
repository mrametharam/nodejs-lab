require("./lab-01");

process.exit();


let arrSource = [123, 234, 345, 'test', 'hello', 'world'];

const arrNew = arrSource;
console.log(arrNew === arrSource);

arrSource.push('Kyle!!!');
arrSource = [];

console.log(arrNew);
