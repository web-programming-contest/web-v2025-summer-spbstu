function zipArrays(...arrays) {
  if (arrays.length === 0)
    return [];

  let maxLen = Math.max(...arrays.map(arr => arr.length));
  let result = [];

  for (let i = 0; i < maxLen; i++) {
    let tmpArr = [];

    for (const arr of arrays) {
      if (i < arr.length)
        tmpArr.push(arr[i]);
    }

    result.push(tmpArr);
  }

  return result;
}

console.log(JSON.stringify(zipArrays([1, 2], ['a', 'b'])));
console.log(JSON.stringify(zipArrays([1, 2, 3], ['a', 'b'])));
console.log(JSON.stringify(zipArrays([1, 2, 3], ['a', 'b', 'c'])));
console.log(JSON.stringify(zipArrays([1, 2, 3], ['a', 'b', 'c'], ["qw", "er", "ty"])));
console.log(JSON.stringify(zipArrays([1, 2], ['a', 'b'], ["qw", "er"])));
console.log(JSON.stringify(zipArrays([1, 2, 3, 4], ['a', 'b', 'c'], ["qw", "er"])));