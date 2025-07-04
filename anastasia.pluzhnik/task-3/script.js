function mergeArrays(arr1, arr2) {
    const merged = [];
    const seen = {};

    for (const item of arr1) {
        if (!seen[item]) {
            seen[item] = true;
            merged.push(item);
        }
    }

    for (const item of arr2) {
        if (!seen[item]) {
            seen[item] = true;
            merged.push(item);
        }
    }

    return merged;
}

function printExample(arr1, arr2, exampleName) {
    console.log(`${exampleName}:`);
    console.log("Массив 1:", arr1);
    console.log("Массив 2:", arr2);
    console.log("Объединенный массив:", mergeArrays(arr1, arr2));
    console.log(); 
}

const numbers1 = [1, 2, 3, 4];
const numbers2 = [3, 4, 5, 6];

const letters1 = ["a", "b", "c"];
const letters2 = ["b", "k", "a"];

const empty1 = [];
const empty2 = [10, 20, 30];

const dup1 = [5, 5, 5];
const dup2 = [5, 5, 10];

printExample(numbers1, numbers2, "Числа");
printExample(letters1, letters2, "Буквы");
printExample(empty1, empty2, "Есть пустой массив");
printExample(dup1, dup2, "Есть дубликат в 1 массиве");