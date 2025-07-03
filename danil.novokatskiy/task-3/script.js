function rotateArray(arr, steps) {
  if (!arr.length) {
    return arr;
  }
  for (let i = 0; i < steps; i++) {
    arr.unshift(arr.pop());
  }
  return arr;
}

arr = [1,2,3];
console.log(rotateArray(arr,2));