function rotateArray(arr, steps) {
  if (!Array.isArray(arr)) return [];

  n = arr.length;
  if (n === 0) return [];

  k = steps % n;
  if (k === 0) return arr.slice();

  return arr.slice(-k).concat(arr.slice(0, n - k));
}

function rotateAndShow() {
  arrayInput = document.getElementById('arrayInput').value.trim();
  stepsInput = document.getElementById('stepsInput').value;
  resultOutput = document.getElementById('resultOutput');

  if (!arrayInput) {
    resultOutput.textContent = 'Введите массив.';
    return;
  }

  arr = arrayInput.split(',').map(x => x.trim()).map(Number);
  if (arr.some(isNaN)) {
    resultOutput.textContent = 'Массив должен содержать только числа.';
    return;
  }

  steps = parseInt(stepsInput, 10);
  if (isNaN(steps) || steps < 0) {
    resultOutput.textContent = 'Введите неотрицательное число шагов.';
    return;
  }

  rotated = rotateArray(arr, steps);
  resultOutput.textContent = rotated.join(', ');
}
