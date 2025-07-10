"use strict";

function toBinary(num) {
    if (isNaN(num)) {
        alert("Ошибка: Вы ввели не число");
        return;
    }

    num = Number(num);
    let binaryNum = num === 0 ? "0" : "";

    console.log("Десятичный вид числа: " + num);

    while (num !== 0) {
        binaryNum = (num % 2) + binaryNum;
        num = Math.floor(num / 2);
    }

    console.log("Двоичный вид числа: " + binaryNum);
}

toBinary(prompt("Введите число"));