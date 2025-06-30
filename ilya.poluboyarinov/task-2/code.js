"use strict";

function absoluteToBinary(num)
{
    let cur = num;
    let result = "";
    if (cur == 0)
    {
        return 0;
    }
    else
    {
        while (cur != 0)
        {
            result += cur % 2;
            cur = Math.floor(cur / 2);
        }
        return result.split("").reverse().join("");
    }
    
}

function toBinary(num)
{
    let cur = Math.abs(num);
    let result = absoluteToBinary(cur);
    if (num >= 0)
    {
        return result;
    }
    else
    {
        let curResult = "";
        for (let i = 0; i < result.length; i++)
        {
            if (result[i] == '1')
            {
                curResult += '0';
            }
            else
            {
                curResult += '1';
            }
        }
        result = curResult;
        if(result[0] == '0')
        {
            result = '1' + result;
        }
        let curNumber = parseInt(result, 2);
        curNumber++;
        return absoluteToBinary(curNumber);
    }
}

let a = Number(prompt("Введите a: "));
console.log(toBinary(a));