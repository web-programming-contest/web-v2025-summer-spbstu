function intersection(arr1, arr2) {
    // По-хорошему, должно быть что-то типа:
    // return Array.from((new Set(arr1)).intersection(new Set(arr2)));
    // Но мы пойдём другим путём
    let big = arr2;
    let small = arr1;
    if (arr1.length > arr2.length) {
        big = arr1;
        small = arr2;
    }
    if (!small) {
        return big;
    }
    big = big.slice().sort();
    small = small.slice().sort();
    let bigIdx = 0;
    let res = [];
    let pushed;
    let flag = false;
    for (let elem of small) {
        if (flag && elem === pushed) {
            continue;
        } else {
            flag = false;
        }
        let another = big[bigIdx];
        while (another < elem) {
            another = big[++bigIdx];
        }
        if (another === elem) { 
            res.push(elem);
            pushed = elem;
            flag = true;
        }
    }
    return res;
}

console.log("Базовая проверка на адекватность:");
console.log(intersection([1,2,3], [4,3,2]));
console.log("Пустые массивы:");
console.log(intersection([], [4,3,2]));
console.log(intersection([1,2,3], []));
console.log(intersection([], []));
console.log("Разная длина:");
console.log(intersection([1,2,3], [4,3,2,1]));
console.log("Строки:");
console.log(intersection(["a", "b", "c"], ["d", "c", "c", "a"]));
console.log("Сохранение порядка в исходных массивах:");
let a = [1, 2, 3];
let b = [4, 3, 2];
console.log(intersection(a, b));
console.log(a, b);