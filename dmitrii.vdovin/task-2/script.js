function convertBase(num, fromBase, toBase){
    if (fromBase < 2 || fromBase > 16 || toBase < 2 || toBase > 16) {
        throw new Error("incorrect base number");
    }
    let acceptableChar = '0123456789abcdef'.slice(0, fromBase);
    let lowerNum = num.toLowerCase();
    for (let i = 0; i < lowerNum.length; i++) {
        if (!(acceptableChar.includes(lowerNum[i]))) {
            throw new Error("incorrect number");
        }
    }
    let value = parseInt(num, fromBase);
    return value.toString(toBase);
}
console.log(convertBase("255", 10, 16));
console.log(convertBase("1010", 2, 10));
console.log(convertBase("123", 5, 9));
console.log(convertBase("12Af", 16, 10));