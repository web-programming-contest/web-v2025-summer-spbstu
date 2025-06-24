function intersection(arr1, arr2){
    const intersection = [];
    if(arr1.length < arr2.length){
        arr1.sort();
        for(let i = 0; i < arr2.length; ++i){
            const index = binSearch(arr1, arr2[i]);
            if(index != -1){
                arr1.splice(index, 1);
                intersection.push(arr2[i]);
            }
        }
    }
    else{
        arr2.sort();
        for(let i = 0; i < arr1.length; ++i){
            const index = binSearch(arr2, arr1[i]);
            if(index != -1){
                arr2.splice(index, 1);
                intersection.push(arr1[i]);
            }
        }
    }
    return intersection;
}


function binSearch(arr, x) {

    let start = 0;
    let end = arr.length - 1;

    while (start <= end) {

        const mid = Math.floor((start + end) / 2);

        if (arr[mid] === x) return mid;

        else if (arr[mid] < x)
            start = mid + 1;
        else
            end = mid - 1;
    }

    return -1;
}





