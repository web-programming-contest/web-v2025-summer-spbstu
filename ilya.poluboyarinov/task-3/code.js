"use strict";

function chunkArray(arr, size)
{
    if (size <= 0 || arr.length == 0)
    {
        return "Некорректные исходные данные";
    }

    let result = [];
    for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size));
    }
    return result;
}

let count = Number(prompt("Введите длину массива: "));
let array = [];
for (let i = 0; i < count; i++)
{
    let num = Number(prompt("Введите число " + (i + 1) + ": "));
    array.push(num);
}
let size = Number(prompt("Введите длину подмассива: "));
let result = chunkArray(array, size);

if (typeof result !== "string")
{
    for (let i = 0; i < result.length; i++)
    {
        let out = "[";
        for (let j = 0; j < result[i].length; j++)
        {
            out += result[i][j];
            if (j + 1 != result[i].length)
            {
                out += ", ";
            }
        }
        console.log(out + "]");
    }
}
else
{
    console.log(result);
}