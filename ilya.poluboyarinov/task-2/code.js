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
function fractionToBinary(num, eps)
{
    if (num < eps)
    {
        return "";
    }
    let cur = num;
    let result = "";
    while (Math.abs(cur - 1) > eps)
    {
        cur *= 2;
        if (cur > 1)
        {
            cur -= 1;
            result += '1';
        }
        else if (Math.abs(cur - 1) < eps)
        {
            result += '1';
        }
        else
        {
            result += '0';
        }
    }
    return result;
}

function toBinary(num)
{
    let cur = Math.abs(num);
    
    let frac = Math.abs(num - Math.trunc(num));

    let result = absoluteToBinary(Math.trunc(cur));
    let result2 = fractionToBinary(frac, 0.01);
    if (num >= 0)
    {
        if (result2.length != 0)
        {
            return result + '.' + result2;
        }
        else
        {
            return result;
        }
    }
    else
    {
        let curResult = "";
        if (Math.abs(num - Math.trunc(num)) > Number.EPSILON)
        {
            curResult = result + '.' + result2;
            let exponent = 0;
            if (result.length > 0 && result != "0")
            {
                exponent = result.length - 1;
                curResult = result + result2;
            }
            else
            {
                const firstOnePos = fracBinary.indexOf('1') + 1;
                exponent = -firstOnePos;
                curResult = result2.slice(firstOnePos);
            }
            const mantissa = curResult.slice(1).replace('.', '').substring(0, 23);
            return '1' + absoluteToBinary(127 + exponent) + mantissa;
        }
        else
        {
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
}

let a = Number(prompt("Введите число: "));
console.log(toBinary(a));
