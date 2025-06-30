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


console.log(findPairsWithSum([1, 2, 7, 4, 5, 6], 7))
console.log(findPairsWithSum([1, 2, 3, 4, 5, 6], 6))
console.log(findPairsWithSum([1, 2, 3, 4, 5, 6], 99))
console.log(findPairsWithSum([2, 5, 5], 7))
console.log(findPairsWithSum([-2, 11], 9))
console.log(findPairsWithSum([6, 5, 4, 3, 2, 1], 7))