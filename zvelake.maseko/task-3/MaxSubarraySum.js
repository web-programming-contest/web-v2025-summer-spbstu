function findMaxSubarraySum(arr, n) {
    if (n > arr.length) return null;
    
    let maxSum = 0;
    let currentSum = 0;

    //первый подмассив
    for (let i = 0; i < n; i++) {
        currentSum += arr[i];
    }
    maxSum = currentSum;

    //сдвигаем
    for (let i = n; i < arr.length; i++) {
        currentSum = currentSum - arr[i - n] + arr[i]; // Убираем левый элемент, добавляем правый
        
        maxSum = Math.max(maxSum, currentSum); 
    }
    return maxSum;
}

var testArrays = {
    "2" : [1, 2, 5, 2, 8, 1, 5],
    "4" : [1, 2, 5, 2, 8, 1, 5],
    "1" : [4, 2, 1, 6],
    "3" : []
};


var body = document.getElementById("Docbody");
var p = document.createElement("p");
p.textContent = "МАКСИМАЛЬНАЯ СУММА ПОДМАССИВОВ РАЗМЕРА N:";
body.appendChild(p);
var div = document.createElement("div");
div.setAttribute("class", "PfromJS");

for(var n of Object.keys(testArrays)){
    arr = testArrays[n];
    let p = document.createElement('p');
    p.textContent = "[" + arr + "], n = " + n + ", MaxSum = " + findMaxSubarraySum(arr, n);

    p.style.fontFamily = "noto mono";
    div.appendChild(p);
}

body.appendChild(div);

// console.log(findMaxSubarraySum([1, 2, 5, 2, 8, 1, 5], 2));
// console.log(findMaxSubarraySum([1, 2, 5, 2, 8, 1, 5], 4));
// console.log(findMaxSubarraySum([4, 2, 1, 6], 1));
// console.log(findMaxSubarraySum([], 3)); 