"use strict";

//let arr = [];
//let k;
let arr = [1, 5, 6, 7, 8, 4, 6, 3, 6, 8];
let k = 3;
try {
    maxSlidingWindow(arr, k);
} catch (err) {
    console.log(err);
}

function maxSlidingWindow(arr, k) {
    let len_arr = arr.length
    if (len_arr == 0) {
        throw {name: 'EmptyArrError', message: 'Массив пуст'};
    } else if (k >= len_arr || k <= 0) {
        throw {name: 'LengthError', message: 'Задана некорректная длина подмассива'};
    }

    for (let i = k; i < (len_arr + 1); i++) {
        let sub_arr = arr.slice(i - k, i);
        console.log(sub_arr);
    }
}
