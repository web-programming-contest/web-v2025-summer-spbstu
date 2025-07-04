"use strict";

let button = document.querySelector('#button');
button.addEventListener('click', convertToAbbr);

function isUpperCase(str) {
    return str === str.toUpperCase();
}

function convertToAbbr() {
    const input_line = document.querySelector('#input').value;
    let input_arr = input_line.split(' ');
    let result_arr = [];
    for (let word of input_arr) {
        for (let i = 0; i < word.length; i++) {
            let letter = word[i];
            if (isUpperCase(letter)) {
                result_arr.push(letter);
            }
        }
    }
    console.log(result_arr);
    let result = document.querySelector('#output');
    result.value = result_arr.join('');
}
