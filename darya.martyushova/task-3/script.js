document.addEventListener('DOMContentLoaded', function() {
    const arrayInput = document.getElementById('array-input');
    const windowSizeInput = document.getElementById('window-size');
    const calculateBtn = document.getElementById('calculate-btn');
    const originalArrayDiv = document.getElementById('original-array');
    const windowSumsDiv = document.getElementById('window-sums');

    calculateBtn.addEventListener('click', function() {
        try {

            const arr = arrayInput.value
                .split(',')
                .map(item => parseFloat(item.trim()))
                .filter(item => !isNaN(item));


            const k = parseInt(windowSizeInput.value);

            if (arr.length === 0) {
                alert('Пожалуйста, введите корректные числа для массива');
                return;
            }

            if (isNaN(k) || k <= 0 || k > arr.length) {
                alert('Размер окна должен быть положительным целым числом, не превышающим длину массива');
                return;
            }

            const sums = slidingWindowSums(arr, k);


            originalArrayDiv.innerHTML = `<strong>Заданный массив:</strong> [${arr.join(', ')}]`;
            windowSumsDiv.innerHTML = `<strong>Сумма окон/слайсов (k=${k}):</strong> [${sums.join(', ')}]`;

        } catch (error) {
            alert(error.message);
            originalArrayDiv.textContent = '';
            windowSumsDiv.textContent = '';
        }
    });


    arrayInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') calculateBtn.click();
    });

    windowSizeInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') calculateBtn.click();
    });
});

function slidingWindowSums(arr, k) {
    const sums = [];
    let currentSum = 0;


    for (let i = 0; i < k; i++) {
        currentSum += arr[i];
    }
    sums.push(currentSum);


    for (let i = k; i < arr.length; i++) {
        currentSum = currentSum - arr[i - k] + arr[i];
        sums.push(currentSum);
    }

    return sums;
}