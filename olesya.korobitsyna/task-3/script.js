document.addEventListener('DOMContentLoaded', function() {
    const arrayInput = document.getElementById('arrayInput');
    const zipButton = document.getElementById('zipButton');
    const resultElement = document.getElementById('result');

    function zipArrays(...arrays) {
        if (arrays.length < 2) throw new Error('Необходимо ввести минимум 2 массива');
        const minLength = Math.min(...arrays.map(arr => arr.length));
        return Array.from({length: minLength}, (_, i) => arrays.map(arr => arr[i]));
    }

    function parseInput(input) {
        const cleanInput = input.trim();
        if (!cleanInput) {
            throw new Error(`Введите массивы. Примеры:\n[1, 2]\n['a', 'b']\nИЛИ\n[1, 2], ['a', 'b']`);
        }

        if (/(^|[^\\'])(")(?=[^"\\]*(?:\\"|\[|,|\]|$))/.test(cleanInput.replace(/'[^']*'/g, ''))) {
            throw new Error('Используйте только одинарные кавычки (\') для строк');
        }

        const arrayStrings = [];
        let current = '';
        let inString = false;
        let bracketDepth = 0;

        for (const char of cleanInput) {
            if (char === "'" && !inString) inString = true;
            else if (char === "'" && inString) inString = false;

            if (char === '[' && !inString) bracketDepth++;
            if (char === ']' && !inString) bracketDepth--;

            current += char;

            if ((char === ',' || char === '\n') && !inString && bracketDepth === 0) {
                const part = current.trim().replace(/,$/, '');
                if (part) arrayStrings.push(part);
                current = '';
            }
        }
        if (current.trim()) arrayStrings.push(current.trim());

        const arrays = [];
        for (const str of arrayStrings) {
            try {
                const jsonStr = str
                    .replace(/'((?:[^'\\]|\\.)*)'/g, function(match, content) {
                        return '"' + content.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
                    });

                const arr = JSON.parse(jsonStr);
                if (!Array.isArray(arr)) throw new Error('Ожидался массив');

                const processedArr = arr.map(item => {
                    if (typeof item === 'string') {
                        return item.replace(/\\"/g, '"');
                    }
                    return item;
                });

                arrays.push(processedArr);
            } catch (e) {
                throw new Error(`Ошибка в массиве: ${str}\n${e.message}`);
            }
        }

        if (arrays.length < 2) throw new Error('Необходимо ввести минимум 2 массива');
        return arrays;
    }

    function formatValue(value) {
        if (Array.isArray(value)) return `[${value.map(formatValue).join(', ')}]`;
        if (value === null) return 'null';
        if (value === undefined) return 'undefined';
        if (typeof value === 'string') return `'${value.replace(/'/g, "\\'")}'`;
        return String(value);
    }

    zipButton.addEventListener('click', function() {
        try {
            const arrays = parseInput(arrayInput.value);
            const zipped = zipArrays(...arrays);
            
            const formatted = zipped.map(arr => 
                `[${arr.map(item => item !== undefined ? formatValue(item) : 'undefined').join(', ')}]`
            ).join(', ');
            
            resultElement.textContent = `[${formatted}]`;
            resultElement.className = 'result-output success';
        } catch (error) {
            resultElement.textContent = `Ошибка: ${error.message}`;
            resultElement.className = 'result-output error';
        }
    });
});
