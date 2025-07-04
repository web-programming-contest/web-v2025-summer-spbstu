"use strict";

function wordReversal(line) {
    let line_new = line.split(' ');
    for (let i = 0; i < line_new.length; i++) {
        line_new[i] = line_new[i].split('').reverse().join('');
    }
    return line_new.join(' ');
}

let line = prompt('строка, которую надо перевернуть:');
console.log('Исходная строка: ' + line);
console.log('Результат: ' + wordReversal(line));