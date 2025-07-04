function countOccurrences(arr) {
  const occurrences = {};

  for (const elem of arr) {
    if (occurrences.hasOwnProperty(elem)) {
      occurrences[elem]++;
    } else {
      occurrences[elem] = 1;
    }
  } 
  return occurrences;
}

let arr = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5];
console.log(countOccurrences(arr));