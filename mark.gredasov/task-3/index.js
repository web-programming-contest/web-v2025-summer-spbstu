"use strict"

function getArrayFromString(str) {
    let arr = str.split(' ');
    return arr;
}

function chunkArray(arr, size) {
    if (!Array.isArray(arr)) {
        console.log("Ошибка: вы передаете не массив");
        return;
    }

    size = Number(size);

    if (size <= 0 || Number.isNaN(size)) {
        console.log("Ошибка: длина подмассивов должна быть числом >= 0");
        return;
    }

    if (size >= arr.length) {
        console.log("Ошибка: длина подмассивов превышает длину передаваемого массива");
        return;
    }

    let obj = {};
    let i = 0;

    console.log("Исходный массив: " + arr);

    while (arr.length !== 0) {
        obj[i] = arr.splice(0, size);
        console.log("Подмассив[" + i + "]: " + obj[i]);
        ++i;
    }
}

let arr = prompt("Введите массив, разделяя элементы пробелом:");
let size = prompt("Введите размер подмассива:");

arr = getArrayFromString(arr);

chunkArray(arr,size);
