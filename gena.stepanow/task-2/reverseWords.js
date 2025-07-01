let hw = "Hello world";
let word = "Hello world amigos gracias";
let test = "Hola";

function traverseStr(str)
{   
    let result = "";
    for (let i = str.length - 1; i >= 0; i--)
    {
        result += str[i];
    }
    return result;
}

function reverseWords(words)
{

    let arr = words.split(" ");
    for (let i = 0; arr.length > i; ++i)
    {
        arr[i] = traverseStr(arr[i]);
    }
    return arr.join();
}

function deleteSep(arr)
{
    elem = ",";
    elem_another = "'";
    while(arr.includes(elem) || arr.includes(elem_another))
    {
        arr = arr.replace(elem, " ").replace(elem_another, " ");
    }
    return arr;
}

console.log(reverseWords(hw));
console.log(deleteSep(reverseWords(hw)))
console.log(deleteSep(reverseWords(word)));