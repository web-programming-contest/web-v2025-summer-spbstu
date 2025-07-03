function  findPairsWithSum(array, sum)
{
    let result = []
    for (let i = 0; i < array.length; i++)
    {
        let toFind = sum - array[i]
        for(let j = i+1; j < array.length; j++)
        {
            if (array[j] === toFind)
            {
                result.push([array[i], array[j]])
            }
        }
    }
    if (result.length === 0)
    {
        return -1;
    }
    return result
}

let test = [1, 2, 3, 4, 5, 6]

let test1 = [1, 1, 1, 2, 2, 2]
console.log(findPairsWithSum(test, 7))
console.log(findPairsWithSum(test, 8))
console.log(findPairsWithSum(test1, 3))
console.log(findPairsWithSum(test1, 4))
console.log(findPairsWithSum(test1, 34))