"use strict";

function isLetter(char) {
    return !(char.toLowerCase() === char.toUpperCase());
}

function isIsogram(str) {
    let lowStr = str.toLowerCase();
    let uniqueLetters = new Set();
    for (let char of lowStr) {
        if (isLetter(char)) {
            if (uniqueLetters.has(char)) {
                return false;
            }
            uniqueLetters.add(char);
        }
    }
    return true;
}
