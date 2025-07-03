function toRoman(num) {
    if (num < 1 || num > 3999) {
        throw new Error("The number must be more than 1 and less than 3999");
    }
    const romanNumbers = [
        {value: 1000, symbol: 'M'},
        {value: 900, symbol: 'CM'},
        {value: 500, symbol: 'D'},
        {value: 400, symbol: 'CD'},
        {value: 100, symbol: 'C'},
        {value: 90, symbol: 'XC'},
        {value: 50, symbol: 'L'},
        {value: 40, symbol: 'XL'},
        {value: 10, symbol: 'X'},
        {value: 9, symbol: 'IX'},
        {value: 5, symbol: 'V'},
        {value: 4, symbol: 'IV'},
        {value: 1, symbol: 'I'}
    ];
    let res = "";
    for (const {value, symbol} of romanNumbers) {
        while (num >= value) {
            res += symbol;
            num -= value;
        }
    }
    return res;
}

function convertToRoman() {
  try {
    const num = document.getElementById('in').value;
    alert(toRoman(num));
  } catch (e) {
    alert(e.message);
  }
}