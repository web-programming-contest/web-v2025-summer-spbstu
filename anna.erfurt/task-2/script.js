"use strict"
const hexInput = document.getElementById('hexInput');
const rgbOutput = document.getElementById('rgbOutput');
const convertBtn = document.getElementById('convertBtn');

convertBtn.addEventListener('click', function() {
  const hex = hexInput.value;
  const result = hexToRgb(hex)
  rgbOutput.textContent = result;
  if (result.startsWith("Ошибка")) {
    rgbOutput.classList.add('error');
  } else {
    rgbOutput.classList.remove('error');
  }
  });

function hexToRgb(hex) {
  const hexRegex = /^#([A-Fa-f0-9]{6})$/;
  if (!hexRegex.test(hex)) {
    return "Ошибка! Неправильный HEX-цвет";
  }
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);
  return `rgb(${r}, ${g}, ${b})`;
}