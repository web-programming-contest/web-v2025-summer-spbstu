let hw = "Hello world";
let word = "Hello world amigos gracias";
let test = "Hola";


function reverseWords(words)
{
    
    let arr = words.split(" ");
    for (let i = 0; arr.length > i; ++i)
    {
        arr[i] = arr[i].split("").reverse().join("");
    }
    return arr.join(" ");
}


console.log(reverseWords(hw));
console.log(reverseWords(hw));
console.log(reverseWords(word));