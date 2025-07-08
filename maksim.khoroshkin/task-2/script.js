"use strict"

function defineZodiacSign(day, month) {
  const zodiacByMonth = {
    1: {20: [1,2]},
    2: {19: [2,3]},
    3: {21: [3,4]},
    4: {20: [4,5]},
    5: {21: [5,6]},
    6: {21: [6,7]},
    7: {23: [7,8]},
    8: {23: [8,9]},
    9: {23: [9,10]},
    10: {23: [10,11]},
    11: {22: [11,12]},
    12: {22: [12,1]},
  }

  const zodiacSigns = {
    1: "Козерог",
    2: "Водолей",
    3: "Рыбы",
    4: "Овен",
    5: "Телец",
    6: "Близнецы",
    7: "Рак",
    8: "Лев",
    9: "Дева",
    10: "Весы",
    11: "Скорпион",
    12: "Стрелец",
  }

  let selectBetween = zodiacByMonth[month];
  let zodiacIndex = day < Object.keys(selectBetween)[0] ? Object.values(selectBetween)[0][0] : Object.values(selectBetween)[0][1];
  return zodiacSigns[zodiacIndex];
}

function processInput() {
  let dayInput = document.getElementById("dayInput").value;
  let monthInput = document.getElementById("monthInput").value;
  
  let resultWindow = document.querySelector("#resultOutput");
  if (!(dayInput.match(/^([1-9]|[12]\d|3[01])$/)
      && monthInput.match(/^([1-9]|1[0-2])$/))) {
    resultWindow.textContent = "incorrect input";
    return;
  }
  dayInput = parseInt(dayInput);
  monthInput = parseInt(monthInput);

  const daysInMonth = {
    1: 31,
    2: 29,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31,
  };

  if (dayInput > daysInMonth[monthInput]) {
    resultWindow.textContent = "incorrect input";
    return;
  }

  let result = defineZodiacSign(dayInput, monthInput);

  resultWindow.textContent = result;
}

const button = document.querySelector("#startButton");
button.addEventListener('click', processInput);

