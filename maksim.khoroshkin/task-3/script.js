"use strict"

function sortByFrequency(arr) {
    let frequencyCounter = {};
    for (let elem of arr) {
        frequencyCounter[elem] = (frequencyCounter[elem] || 0) + 1;
    }

    arr.sort((a, b) => {
        if (frequencyCounter[b] === frequencyCounter[a]) {
            return String(a).localeCompare(String(b));
        }
        return frequencyCounter[b] - frequencyCounter[a];
    });
}

let arr = [5, 1, 2, 1, 3, 2, 2, 2, 3, 8, 8];
sortByFrequency(arr);
console.log(arr);

arr = ['a', 'b', 'b', 'c', 'c', 'a', 'c'];
sortByFrequency(arr);
console.log(arr);

arr = [null, null, 1, 1, 2, 'a', 'b', 'b', 'd', 7, 1];
sortByFrequency(arr);
console.log(arr);
