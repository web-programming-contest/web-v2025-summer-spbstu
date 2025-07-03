'use strict'

function findTheLongestPalindrome(str) {
  if (typeof str !== 'string') str = String(str);
  // Обрабатываем входную строку, добавляя '#' между символами и в начало/конец
  const t = '#' + str.split('').join('#') + '#';
  const arrOfRadius = new Array(t.length).fill(0); // Массив радиусов палиндромов для каждого центра
  let center = 0; 			// Центр текущего палиндрома
  let right = 0; 			// Правая граница текущего палиндрома

  let maxLen = 1; 			// Длина самой длинной подстроки-палиндрома
  let maxCenter = 0; 			// Центр самой длинной подстроки-палиндрома

  for (let i = 0; i < t.length; i++) {

    // Если текущая позиция находится внутри текущего палиндрома,
    // с помощью зеркальной позиции найдём радиуса
    if (right > i) {
      arrOfRadius[i] = Math.min(right - i, arrOfRadius[-i]);
    }

    // Расширяем палиндром от текущей позиции
    let leftBound = i - (1 + arrOfRadius[i]);
    let rightBound = i + (1 + arrOfRadius[i]);

    while (leftBound >= 0 && rightBound < t.length && t[leftBound] === t[rightBound]) {
      arrOfRadius[i]++;
      leftBound--;
      rightBound++;
    }

    // Если текущий палиндром выходит за правую границу текущего,
    // обновляем центр и правую границу
    if (i + arrOfRadius[i] > right) {
      center = i;
      right = i + arrOfRadius[i];
    }

    // Обновляем самую длинную подстроку-палиндром
    if (arrOfRadius[i] > maxLen) {
      maxLen = arrOfRadius[i];
      maxCenter = i;
    }
  }

  return str.substr((maxCenter - maxLen) / 2, maxLen);
}

let string = prompt('Введите строку');
let theLongestPalindrome = findTheLongestPalindrome(string);
alert(theLongestPalindrome)
console.log(theLongestPalindrome);
console.log(theLongestPalindrome.length);

// Exemple: abcdedcfghihgfcdedcfgz
// the longest palindrome с 3ий по 19ый элемент: ab cdedcfghihgfcdedc fgz