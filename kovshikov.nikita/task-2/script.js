"use strict"

function findMissingNumber(arr) {
    let prev = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] - prev != 1) {
            return arr[i] - 1;
        }
        else {
            prev = arr[i];
        }
    }
    return 0;
}

let stringArray = prompt('Задайте массив чисел идущих от 1 до N через пробел, в которой будет пропущено одно число');
let arr = stringArray.split(" ");
console.log('Исходный массив:' + arr);
console.log('Пропущенное число:' + findMissingNumber(arr));