const display = document.getElementById("display");

function clearScreen() {
    display.value = "0";
}

function press(char) {
	const isOperator = ['+', '-', '*', '/'].includes(char);
	if (display.value === '0' && !isOperator) {
		display.value = char;
	} else {
		display.value += char;
	}
}

function calculateExpression(expr) {
    if (!expr) {
        return "0";
    }

    const priority = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2,
    };

	function convertToRPN(tokens) {
	    const outputString = [];
	    const operatorStack = [];

	    for (const token of tokens) {
	        if (!isNaN(parseFloat(token))) {
	            outputString.push(token);
	            continue;
	        }

	        if (token in priority) {
	            while (operatorStack.length > 0 && priority[operatorStack[operatorStack.length - 1]] >= priority[token]) {
	                outputString.push(operatorStack.pop());
	            }
	            operatorStack.push(token);
	        }
	    }

	    while (operatorStack.length > 0) {
	        outputString.push(operatorStack.pop());
	    }

	    return outputString;
	}

	function calculateRPN(rpnExpr) {
	    const stack = [];

	    for (const token of rpnExpr) {
	        if (!isNaN(parseFloat(token))) {
	            stack.push(parseFloat(token));
	            continue;
	        }

	        const rightOperand = stack.pop();
	        const leftOperand = stack.pop();

	        if (leftOperand === undefined || rightOperand === undefined) {
	             return "Ошибка";
	        }

	        switch (token) {
	            case '+':
	                stack.push(leftOperand + rightOperand);
	                break;
	            case '-':
	                stack.push(leftOperand - rightOperand);
	                break;
	            case '*':
	                stack.push(leftOperand * rightOperand);
	                break;
	            case '/':
	                if (rightOperand === 0) {
	                    return "Ошибка";
	                }
	                stack.push(leftOperand / rightOperand);
	                break;
	        }
	    }

	    if (stack.length !== 1) {
	        return "Ошибка";
	    }

	    return stack[0];
	}

    let tokens = expr.match(/(\d+\.?\d*|[\+\-\*\/])/g);
    if (!tokens) { 
        return "Ошибка";
    }

    if (tokens[0] === '-' && tokens.length > 1 && !isNaN(parseFloat(tokens[1]))) {
        const negativeNumber = '-' + tokens[1];
        tokens = [negativeNumber, ...tokens.slice(2)];
    }
    
    const rpnExpr = convertToRPN(tokens);
    const result = calculateRPN(rpnExpr);

    if (typeof result === 'string') {
        return result;
    }
    
    return Math.round(result * 1e6) / 1e6;
}

document.addEventListener('DOMContentLoaded', () => {
	const buttons = document.querySelectorAll('.btn');

	buttons.forEach(button => {
		button.addEventListener('click', () => {
			const value = button.textContent;

			if (value === 'C') {
				clearScreen();
			} else if (value === '=') {
				display.value = calculateExpression(display.value);
			} else {
				press(value);
			}
		});
	});
});