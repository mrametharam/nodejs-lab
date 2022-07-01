// https://www.youtube.com/watch?v=R8rmfD9Y5-c

const items = [
    { name: 'bike', price: 100, expired: false },
    { name: 'tv', price: 200, expired: true },
    { name: 'album', price: 10, expired: false },
    { name: 'book', price: 5, expired: false },
    { name: 'phone', price: 500, expired: false },
    { name: 'computer', price: 1000, expired: true },
    { name: 'keyboard', price: 25, expired: true }
];

//#region Filter()
const filteredItems = items.filter((i) => i.price <= 100 && !i.expired);

console.table(filteredItems);
//#endregion

//#region Map()
// https://stackoverflow.com/questions/40348171/es6-map-an-array-of-objects-to-return-an-array-of-objects-with-new-keys
const mappedItems = items.map((i) => ({ x: i.name, y: i.price }));
const mappedItems2 = items.map((i) => [i.name, i.price].join(' ==>  '));

console.log({ mappedItems, mappedItems2 });
//#endregion

//#region Find()
const searchFor = 'book';
const foundItem = items.find((i) => i.name == searchFor);

console.log({ foundItem });
//#endregion

//#region ForEach()
items.forEach((i) => console.log(i.name));
//#endregion

//#region Some() - returns true if even just 1 item in the array matches the criteria.
const someItem = items.some((i) => i.price <= 100);
console.log({ someItem });
//#endregion

//#region  Every() - returns true if every item in the array matches the criteria.
const everyItem = items.every((i) => i.price <= 100);
console.log({ everyItem });
//#endregion

//#region Reduce() - reduces the array to a single item by performing an operation on it. 
// The last parameter zero is the starting value of currTttl
const reduceTotal = items.reduce((currTtl, i) => i.price + currTtl, 0);
console.log({ reduceTotal });
//#endregion
