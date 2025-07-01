let arr = [1, 1, 2, 3, 4, 5, 4, 3, 2, 1, 1, 0, 2, 3, 4];
let another_arr = [-1, -2,3,4,-5]
let n = 6;
let another_n = 3; 


/*function findMaxSubarray(arr, n){
    let result = 0;
    for (let i = 0; i <= arr.length - n; ++i)
    {
        let sum = 0;
        for (let j = i; j < i + n; ++j)
        {
            sum += arr[j];            
        }
        result = Math.max(sum, result);
    }
    return result
}*/

function findMaxSubarray(arr, n)
{   
    let result = 0;
    if (n >= arr.length)
    {
        let sum = 0;
        arr.forEach(elem =>sum += elem);
        return sum;
    }
    for (let i = 0; )


    return result;
}
let maxSum = findMaxSubarray(arr,n);
let another_maxSum = findMaxSubarray(another_arr, another_n)

console.log(maxSum);
console.log(another_maxSum);

