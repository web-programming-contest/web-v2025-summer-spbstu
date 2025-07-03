'use strict'

function difference(arr1, arr2) {
    let tempArr = [];
    // removing duplicates
    arr1 = [...new Set(arr1)];
    arr2 = [...new Set(arr2)];
    for (let elem of arr1) {
	if (!arr2.includes(elem)) {
	    tempArr.push(elem);
	}
    }
    /*
    arr1.forEach((elem)=> {
	if (!arr2.includes(elem)) tempArr.push(elem);
    });
    */
    return tempArr;
}


// tests
let array1 = [1, 5, 5, 6, 3, 2, 10];
let array2 = [1, 4, 7, 5, 8];

console.log(array1);
console.log(array2);
console.log("difference: ", difference(array1, array2));
// difference: [6, 3, 2, 10]

let array3 = [1, 8, 8, 6, 2];
let array4 = [2, 4, 0, 5, 8, 10, 12, 3];

console.log(array3);
console.log(array4);
console.log("difference: ", difference(array3, array4));
// difference: [1, 6]