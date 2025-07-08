'use strict'

function difference(arr1, arr2) {
    let temp = new Set(arr1.concat(arr2));
    // removing duplicates
    temp.forEach((elem)=> {
	if (arr1.includes(elem)&&arr2.includes(elem)) {
	    temp.delete(elem);
	}
    });

    //return temp;
    return Array.from(temp);
}

// tests
let array1 = [1, 2, 2, 3, 4];
let array2 = [1, 4, 5, 5, 6];

console.log(array1);
console.log(array2);
console.log("difference: ", difference(array1, array2));
// difference: [2, 3, 5, 6]

let array3 = [1, 2, 3];
let array4 = [9, 8, 7];

console.log(array3);
console.log(array4);
console.log("difference: ", difference(array3, array4));
// difference: [1, 2, 3, 9, 8, 7]