"use strict";

let button = document.querySelector('#button');
button.addEventListener('click', convertToAbbr);

function convertToAbbr() {
    const input_line = document.querySelector('#input').value;
    let result = document.querySelector('#output');
    result.value = input_line;
}
