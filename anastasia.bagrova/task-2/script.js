'use strict';

//В other символы могут повторяться, если они повторялись в исходной строке
function analyzieString(str){
    let objCounter = {
        letters: 0,
        digits: 0,
        spaces: 0,
        other: '',
    };

    for (let symbol of str){
        if (symbol >= 'a' && symbol <= 'z' ||
            symbol >='A' && symbol <= 'Z' ||
            symbol >= 'а' && symbol <= 'я' ||
            symbol >= 'А' && symbol <= 'Я') {
            objCounter.letters += 1;
        } else if (symbol >= '0' && symbol <= '9'){
            objCounter.digits += 1;
        } else if (symbol === ' '){
            objCounter.spaces += 1;
        } else{
            objCounter.other += symbol;
        }
    }
    return objCounter;
}

//В other записываются только уникальные символы из исходной строки
function analyzieStringUnique(str){
    let objCounter = {
        letters: 0,
        digits: 0,
        spaces: 0,
        other: '',
    };

    for (let symbol of str){
        if (symbol >= 'a' && symbol <= 'z' ||
            symbol >='A' && symbol <= 'Z' ||
            symbol >= 'а' && symbol <= 'я' ||
            symbol >= 'А' && symbol <= 'Я') {
            objCounter.letters += 1;
        } else if (symbol >= '0' && symbol <= '9'){
            objCounter.digits += 1;
        } else if (symbol === ' '){
            objCounter.spaces += 1;
        } else if (!(objCounter.other.includes(symbol))){
            objCounter.other += symbol;
        }
    }
    return objCounter;
}

let line = prompt('Введите, пожалуйста, строку:');
console.log('Исходная строка:',line);
console.log(analyzieString(line));
console.log(analyzieStringUnique(line));