"use strict";

function findMaxSubarraySum(arr, n) {
    if (n <= 0 || n > arr.length) return 0;
    let maxSum = -Infinity;
    for (let i = 0; i <= arr.length - n; i++) {
        let currentSum = 0;
        for (let j = i; j < i + n; j++) {
            currentSum += arr[j];
        }
        if (currentSum > maxSum) {
            maxSum = currentSum;
        }
    }
    return maxSum;
}

let line_arr = prompt('Введите массив в формате: число число число (проста числа через пробел):');
let line_n = prompt('Введите длину подмассива:');
let n = Number(line_n);
let arr_str = line_arr.split(' ');
let arr_num = arr_str.map(elem => Number(elem));

console.log('Исходный массив: [' + arr_num.join(', ') + ']');
console.log('Длина подмассива: ' + n);

// Вычисляем и выводим результат
let result = findMaxSubarraySum(arr_num, n);
console.log('Максимальная сумма подмассива: ' + result);
alert('Максимальная сумма подмассива длиной ' + n + ': ' + result);