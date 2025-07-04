document.addEventListener('DOMContentLoaded', function() {
    const rgbInput = document.getElementById('rgb-input');
    const convertBtn = document.getElementById('convert-btn');
    const hexOutput = document.getElementById('hex-output');
    const colorPreview = document.getElementById('color-preview');

    convertBtn.addEventListener('click', function() {
        const rgbString = rgbInput.value.trim();
        try {
            const hexColor = rgbToHex(rgbString);
            hexOutput.value = hexColor;
            colorPreview.style.backgroundColor = hexColor;
        } catch (error) {
            alert(error.message);
            hexOutput.value = '';
            colorPreview.style.backgroundColor = 'transparent';
        }
    });

    rgbInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            convertBtn.click();
        }
    });
});

function rgbToHex(rgbString) {

    const rgbRegex = /^\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*$/;
    const match = rgbString.match(rgbRegex);

    if (!match) {
        throw new Error('Неверный формат RGB. Используйте: "255,0,0" или "255, 0, 0"');
    }

    const r = parseInt(match[1], 10);
    const g = parseInt(match[2], 10);
    const b = parseInt(match[3], 10);


    if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
        throw new Error('Числа должны быть от 0 до 255');
    }

    const toHex = (c) => c.toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}