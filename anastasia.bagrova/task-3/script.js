'use strict';

function removeDuplicates(arr){
    let arrWithoutDupl = [];
    for (let elem of arr){
        if (!arrWithoutDupl.includes(Number(elem))){
            arrWithoutDupl.push(Number(elem));
        }
    }
    return arrWithoutDupl;
}

let str = prompt(`Введите, пожалуйста, исходный массив в формате:
[число, число, ..., число]`);
let strArr = str.slice(1,str.length-1).split(', ');
let numArr = [];
for (const elem of strArr){
    numArr.push(Number(elem));
}
console.log('Исходный массив:', numArr);
console.log('Массив без дубликатов:', removeDuplicates(numArr));