function mergeArrays(arr1, arr2) {
    const merged = [];
    for (let i of arr1){
        if (!(merged.includes(i))){
            merged.push(i)
        }
    }
    for (let i of arr2){
        if (!(merged.includes(i))){
            merged.push(i)
        }
    }
    return merged;
}
const array1 = [1, 2, 3];
const array2 = [3, 4, 5];
console.log(mergeArrays(array1, array2));

const array3 = [3, 4, 1, 3];
const array4 = [7, 1, 11, 8, 7];
console.log(mergeArrays(array3, array4));

const array5 = ["a", "b", "c", "a"];
const array6 = ["d", "f", "a"];
console.log(mergeArrays(array5, array6));
