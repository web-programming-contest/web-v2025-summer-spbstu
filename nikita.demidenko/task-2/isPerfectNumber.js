function isPerfectNumber(num) {
    let sqrt = Math.floor(Math.sqrt(num));
    let sum = -num;
    for (let i = 1; i <= sqrt; ++i) {
        if (num % i === 0) {
            sum += i + num / i
        }
    }
    if (sqrt * sqrt === num) {
        sum -= sqrt;
    }
    return sum && sum === num;
}

for (let i = 0; i < 10000; ++i) {
    if (isPerfectNumber(i)) {
        console.log(`Совершенное число: ${i}`);
    }
}