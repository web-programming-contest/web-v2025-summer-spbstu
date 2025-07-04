"use strict"

function moveZerosToEnd(arr) {
	if (!arr || arr.length === 0) {
		return [];
	}

	let result = [];
	let zeroCount = 0;

	for (let i = 0; i < arr.length; i++) {
		if (arr[i] === 0) {
			zeroCount++;
		} else {
			result.push(arr[i]);
		}
	}

	for (let i = 0; i < zeroCount; i++) {
		result.push(0);
	}

	return result;
}

console.log(moveZerosToEnd([]));
console.log(moveZerosToEnd(null));
console.log(moveZerosToEnd([0, 1, 0, 3, 12]));
console.log(moveZerosToEnd([1, 2, 3, 4]));
console.log(moveZerosToEnd([0, 0, 0]));
console.log(moveZerosToEnd([1, 0, 2, 0, 3, 0, 4]));
