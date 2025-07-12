function zipArrays(...arrays) {

  if (arrays.length === 0) 
    return [];
  const minLength = Math.max(...arrays.map(arr => arr.length));
  const result = [];

  for (let i = 0; i < minLength; i++) {

    const zippedElement = [];
    arrays.forEach(array => {
      
      if (array[i])
        zippedElement.push(array[i]);

    });
  
    result.push(zippedElement);

  }

  return result;
}

console.log(zipArrays([1, 2, 3, 4], ['a', 'b'], [11, 12]));