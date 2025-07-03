function findMostFrequent(arr) {
    mostFrequentElem = null;
    mostFrequentElemCount = 0;
    const elems = {};
    for (let elem of arr) {
        if (!elems[elem]) {
            elems[elem] = 1;
        } else {
            elems[elem]++;    
        }
        if (mostFrequentElemCount < elems[elem]) {
            mostFrequentElemCount = elems[elem];
            mostFrequentElem = elem;
        }
    }
    return mostFrequentElem;
}

function inputArray() {
    const input = prompt("Введите элементы массива через пробел, запятую или точку с запятой:");
    if (!input) return;

    const arr = input.split(/[ ,;]+/).filter(item => item.trim() !== '');
    
    if (arr.length === 0) {
        alert("Массив пуст!");
        return;
    }

    const mostFrequent = findMostFrequent(arr);
    alert(`Самый часто встречающийся элемент: ${mostFrequent}`);
}