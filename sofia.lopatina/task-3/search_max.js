"use strict";

let out = document.querySelector('#output');
let button = document.querySelector('#button');
button.addEventListener('click', processInput);

function processInput() {
    const input_arr = document.querySelector('#input_arr').value;
    const input_k = document.querySelector('#input_k').value;
    let arr = [];
    let num_arr = [];
    let k;
    try {
        arr = input_arr.replaceAll(' ', '');
        arr = arr.split(',');
        for (let i = 0; i < arr.length; i++)
        {
            if (arr[i] == '') {
                continue;
            }
            let elem = Number(arr[i]);
            if (isNaN(elem)) {
                throw {name: 'InvalidNumError', message: 'Введено не число.'};
            }
            num_arr.push(elem);
        }
        k = Number(input_k);
        if (isNaN(k)) {
            throw {name: 'InvalidNumError', message: 'Введено не число.'};
        }
        maxSlidingWindow(num_arr, k);
    } catch(err) {
        out.textContent = err.name + ': ' + err.message;
        console.log(err);
    }
}

function maxSlidingWindow(arr, k) {
    let len_arr = arr.length
    if (len_arr == 0) {
        throw {name: 'EmptyArrError', message: 'Массив пуст.'};
    } else if (k > len_arr || k <= 0) {
        throw {name: 'LengthError', message: 'Задана некорректная длина подмассива.'};
    }
    out.textContent = '';
    for (let i = k; i <= len_arr; i++) {
        let sub_arr = arr.slice(i - k, i);
        let maximum = Math.max(...sub_arr)

        let elem = document.createElement('p');
        elem.innerHTML = '[ ' + sub_arr.join(', ') + ' ] => ' + maximum;
        out.append(elem);
    }
}
