let arr = [1, 1, 2, 3, 4, 5, 4, 3, 2, 1, 1, 0, 2, 3, 4];
let another_arr = [-1, -2,3,4,-5]
let n = 6;
let another_n = 3; 

function findMaxSubarray(arr, n)
{   
    let result = 0;
    if (n >= arr.length)
    {
        let sum = 0;
        arr.forEach(elem =>sum += elem);
        return sum;
    }
    result = arr.slice(0, n).reduce((acc, val) => acc + val, 0);
    let maxSum = result;
    for (let i = n; i < arr.length; ++i)
    {
        result = result - arr[i-n] + arr[i];
        if (result > maxSum )
        {
            maxSum = result;
        }

    }
    return maxSum;
}
let maxSum = findMaxSubarray(arr,n);
let another_maxSum = findMaxSubarray(another_arr, another_n)

console.log(maxSum);
console.log(another_maxSum);
