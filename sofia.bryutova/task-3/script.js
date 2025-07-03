"use strict"

function findMostFrequent(arr) {
	if (!arr || arr.length === 0) {
    	return null;
  	}

  	let frequencyMap = new Map();
  
  	arr.forEach(function(element) {
  		let count = (frequencyMap.get(element) || 0) + 1;
    	frequencyMap.set(element, count);
  	});
  	
  	let mostFrequentElement = null;
  	let maxCount = 0;
  
  	for (let [element, count] of frequencyMap.entries()) {
    	if (count > maxCount) {
      		maxCount = count;
      		mostFrequentElement = element;
    	}
  	}
  
	return mostFrequentElement;
}

console.log(findMostFrequent([]))
console.log(findMostFrequent(null))
console.log(findMostFrequent([1]))
console.log(findMostFrequent([3, 10, -2, 1, 4, -2, 3, 6, -2, 1])) 
console.log(findMostFrequent(['a', 'b', 'c', 'a', 'b', 'b', 'd', 'e']))
console.log(findMostFrequent([true, false, true, true, false, true, false]))
console.log(findMostFrequent([3, 4, 1, 2, 4, 1, 7, 2]))
console.log(findMostFrequent([0, 0, 0, 0, 0]))