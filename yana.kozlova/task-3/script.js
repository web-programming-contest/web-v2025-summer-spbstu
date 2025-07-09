"use strict";

function findMaxSubarraySum(arr, n) {
    let max_sum = arr.slice(0, n).reduce((x, y) => x + y, 0);
    let sum = max_sum;
    for (let i = n; i < arr.length; i++) {
        sum += arr[i] - arr[i - n];
        max_sum = Math.max(sum, max_sum);
    }
    return max_sum;
}

let line_arr = prompt('Введите массив в формате: число число число (просто числа через пробел):');
let line_n = prompt('Введите длину подмассива:');
let n = Number(line_n);
let arr_str = line_arr.split(' ');
let arr_num = arr_str.map(elem => Number(elem));
console.log('Исходный массив: [' + arr_num.join(', ') + ']');
console.log('Результат: ', findMaxSubarraySum(arr_num, n));
