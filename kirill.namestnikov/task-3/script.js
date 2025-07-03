function findEquilibriumIndex(arr){
    if (arr.length === 0){
        throw new Error("No elements in this array");
    }
    let sum = arr.reduce((sum, num) => sum + num, 0);
    let prefixSum = 0;
    for (let i = 0; i < arr.length; ++i){
        if (prefixSum === sum - prefixSum - arr[i]){
            return i;
        }
        prefixSum += arr[i];
    }
    return -1;
}

try{
    console.log(findEquilibriumIndex([1, 5, 3, 2, 1]));
    console.log(findEquilibriumIndex([1, 1, 1, 1, 1]));
    console.log(findEquilibriumIndex([7, 2, 1, 5, 10]));
    console.log(findEquilibriumIndex([12, 1, 5, 3, 2, 2]));
    console.log(findEquilibriumIndex([]));
}
catch (e){
    console.log(e.message);
}