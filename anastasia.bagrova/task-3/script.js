'use strict';

function removeDuplicates(arr){
    return Array.from(new Set(arr));
}

let str = prompt(`Введите, пожалуйста, исходный массив в формате:
[число, число, ..., число]`);
let strArr = str.slice(1,str.length-1).split(', ');
let numArr = strArr.map((str) => Number(str));
console.log('Исходный массив: ', numArr);
console.log('Массив без дубликатов: ', removeDuplicates(numArr));