function isPangram(str) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const lowerStr = str.toLowerCase();

    for (let letter of alphabet) {
        if (!lowerStr.includes(letter)) {
            return false;
        }
    }

    return true; 
}


const input = process.argv.slice(2).join(" ");

if (!input) {
    console.log("Пожалуйста, передайте строку для проверки.");
} else {
    console.log("Для строки:" + " \"" + input + "\"")
    console.log(isPangram(input));
}

//"The quick brown fox jumps over the lazy dog" -- панграмма