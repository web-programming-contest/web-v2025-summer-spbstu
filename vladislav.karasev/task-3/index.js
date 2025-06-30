// Solution 1
function findPairsWithSum(arr, sum) {
    let prefixes = {}
    let res = []
    for (let i = 0; i < arr.length; i++) {
            if (prefixes[arr[i]]) {
                res.push([sum - arr[i], arr[i]])
                prefixes[sum-arr[i]] += 1
            } else {
                prefixes[sum-arr[i]] = 1
            }
    }
    return res
}


// Solution 2
function findPairsWithSum(arr, sum) {
    let i = 0
    let j = arr.length - 1
    let res = []
    arr = arr.sort((a,b) => a - b)
    while (i < j) {
        if (arr[i] + arr[j] === sum) {
            res.push([arr[i], arr[j]])
            j--
            i++
        } else if (arr[i] + arr[j] > sum) {
            j--
        } else {
            i++
        }
    }
    return res
}

console.log(findPairsWithSum([1, 2, 7, 4, 5, 6], 7))
console.log(findPairsWithSum([1, 2, 3, 4, 5, 6], 6))
console.log(findPairsWithSum([1, 2, 3, 4, 5, 6], 99))
console.log(findPairsWithSum([2, 5, 5], 7))
console.log(findPairsWithSum([-2, 11], 9))
console.log(findPairsWithSum([6, 5, 4, 3, 2, 1], 7))