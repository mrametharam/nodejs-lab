// Looping through arrays
// https://masteringjs.io/tutorials/fundamentals/foreach-break

const arr = [];
const ARR_SIZE = 1000;

const id = 473;
let idx = 0;
let rec = null;

// Building the array
for (idx = 0; idx < ARR_SIZE; idx++) {
    arr.push({ id: idx, expiration: new Date().getTime() + 3000 });
}

console.log(idx, arr.length);

// Breaking out of a for loop.
for (idx = 0; idx < arr.length; idx++) {
    if (arr[idx].id == id) {
        rec = arr[idx];
        break;
    }
}

console.log(idx, { rec });

// Cannot break out of a foreach
rec = null;
idx = 0;

arr.forEach((r) => {
    idx++;

    if (r.id == id) {
        rec = r;
        return;
    }
});

console.log(idx, { rec });

// Use every() instead of forEach()
rec = null;
idx = 0;

arr.every((r) => {
    idx++;
    
    // When using every(), you need to return true otherwise, it stops. Return false to break out.
    if (r.id != id) return true;

    rec = r;
});

console.log(idx, { rec });