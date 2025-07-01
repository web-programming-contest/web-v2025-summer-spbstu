let arr = [1, 1, 2, 3, 4, 5, 4, 3, 2, 1, 1, 0, 2, 3, 4];
let n = 6;

function findMaxSubarray(arr, n){
    let result = 0;
    for (let i = 0; i < arr.length; ++i)
    {
        let sum = 0;
        for (let j = i; j < arr.length - n; ++j)
        {
            sum += arr[j];            
        }
        result = Math.max(sum, result);
    }
    return result
}
let result = findMaxSubarray(arr,n);

console.log(maxSum)

