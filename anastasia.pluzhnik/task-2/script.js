document.addEventListener('DOMContentLoaded', () => {
    const numberInput = document.getElementById('number');
    const fromBaseInput = document.getElementById('fromBase');
    const toBaseInput = document.getElementById('toBase');
    const convertBtn = document.getElementById('convertBtn');
    const resultInput = document.getElementById('result');

    convertBtn.addEventListener('click', () => {
        const num = numberInput.value.trim();
        const fromBase = parseInt(fromBaseInput.value);
        const toBase = parseInt(toBaseInput.value);

        if (!num) {
            alert('Please enter a number');
            return;
        }

        if (isNaN(fromBase) || isNaN(toBase) || fromBase < 2 || fromBase > 36 || toBase < 2 || toBase > 36) {
            alert('Bases must be between 2 and 36');
            return;
        }

        try {
            const converted = convertBase(num, fromBase, toBase);
            resultInput.value = converted;
        } catch (e) {
            alert(e.message);
        }
    });

    function convertBase(num, fromBase, toBase) {

        if (!isValidNumber(num, fromBase)) {
            throw new Error(`Invalid number "${num}" for base ${fromBase}`);
        }

        let decimal = parseInt(num, fromBase);

        return decimal.toString(toBase).toUpperCase();
    }

    function isValidNumber(num, base) {
        const validDigits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.substring(0, base);
        const regex = new RegExp(`^[+-]?[${validDigits}]+(\\.[${validDigits}]+)?$`, 'i');
        return regex.test(num);
    }
});
