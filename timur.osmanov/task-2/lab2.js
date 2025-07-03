class Parser {
    constructor() {
        this.tokens = [];
        this.currentTokenIndex = 0;
        this.currentToken = null;
    }

    static TokenType = {
        NUMBER: 'NUMBER',
        PLUS: 'PLUS',
        MINUS: 'MINUS',
        MULTIPLY: 'MULTIPLY',
        DIVIDE: 'DIVIDE',
        LPAREN: 'LPAREN',
        RPAREN: 'RPAREN',
        EOF: 'EOF'
    };

    init(input) {
        this.tokenize(input);
        this.currentTokenIndex = 0;
        this.currentToken = this.tokens[0];
    }

    tokenize(input) {
        this.tokens = [];
        let i = 0;

        while (i < input.length) {
            const ch = input[i];

            if (/\s/.test(ch)) {
                i++;
                continue;
            }

            if (/[0-9]/.test(ch)) {
                let numStr = '';
                while (i < input.length && /[0-9.]/.test(input[i])) {
                    numStr += input[i];
                    i++;
                }

                const num = parseFloat(numStr);
                if (!isNaN(num)) {
                    this.tokens.push({
                        type: Parser.TokenType.NUMBER,
                        value: num
                    });
                } else {
                    throw new Error(`Invalid number: ${numStr}`);
                }
                continue;
            }

            switch (ch) {
                case '+':
                    this.tokens.push({ type: Parser.TokenType.PLUS });
                    break;
                case '-':
                    this.tokens.push({ type: Parser.TokenType.MINUS });
                    break;
                case '*':
                    this.tokens.push({ type: Parser.TokenType.MULTIPLY });
                    break;
                case '/':
                    this.tokens.push({ type: Parser.TokenType.DIVIDE });
                    break;
                case '(':
                    this.tokens.push({ type: Parser.TokenType.LPAREN });
                    break;
                case ')':
                    this.tokens.push({ type: Parser.TokenType.RPAREN });
                    break;
                default:
                    throw new Error(`Unknown character: ${ch}`);
            }
            i++;
        }

        this.tokens.push({ type: Parser.TokenType.EOF });
    }

    nextToken() {
        this.currentTokenIndex++;
        if (this.currentTokenIndex < this.tokens.length) {
            this.currentToken = this.tokens[this.currentTokenIndex];
        } else {
            this.currentToken = { type: Parser.TokenType.EOF };
        }
    }

    match(expectedTypes) {
        if (!Array.isArray(expectedTypes)) {
            expectedTypes = [expectedTypes];
        }

        if (expectedTypes.includes(this.currentToken.type)) {
            const token = this.currentToken;
            this.nextToken();
            return token;
        } else {
            throw new Error(`Syntax error: Expected ${expectedTypes.join(' or ')}, found ${this.currentToken.type}`);
        }
    }

    calculateExpression(input) {
        this.init(input);
        const result = this.E();
        this.match(Parser.TokenType.EOF);
        return result;
    }

    E() {
        const T_val = this.T();
        return this.Q(T_val);
    }

    Q(leftValue) {
        if ([Parser.TokenType.PLUS, Parser.TokenType.MINUS].includes(this.currentToken.type)) {
            const op = this.match([Parser.TokenType.PLUS, Parser.TokenType.MINUS]);
            const T_val = this.T();

            let newLeftValue;
            if (op.type === Parser.TokenType.PLUS) {
                newLeftValue = leftValue + T_val;
            } else {
                newLeftValue = leftValue - T_val;
            }

            return this.Q(newLeftValue);
        }

        return leftValue;
    }

    T() {
        const F_val = this.F();
        return this.R(F_val);
    }

    R(leftValue) {
        if ([Parser.TokenType.MULTIPLY, Parser.TokenType.DIVIDE].includes(this.currentToken.type)) {
            const op = this.match([Parser.TokenType.MULTIPLY, Parser.TokenType.DIVIDE]);
            const F_val = this.F();

            let newLeftValue;
            if (op.type === Parser.TokenType.MULTIPLY) {
                newLeftValue = leftValue * F_val;
            } else {
                newLeftValue = leftValue / F_val;
            }

            return this.R(newLeftValue);
        }

        return leftValue;
    }

    F() {
        if (this.currentToken.type === Parser.TokenType.LPAREN ||
            this.currentToken.type === Parser.TokenType.NUMBER) {
            return this.P();
        } else if ([Parser.TokenType.PLUS, Parser.TokenType.MINUS].includes(this.currentToken.type)) {
            const op = this.match([Parser.TokenType.PLUS, Parser.TokenType.MINUS]);
            const F_val = this.F();
            return op.type === Parser.TokenType.PLUS ? F_val : -F_val;
        } else {
            throw new Error(`Syntax error in F: Unexpected token ${this.currentToken.type}`);
        }
    }

    P() {
        if (this.currentToken.type === Parser.TokenType.NUMBER) {
            const token = this.match(Parser.TokenType.NUMBER);
            return token.value;
        } else if (this.currentToken.type === Parser.TokenType.LPAREN) {
            this.match(Parser.TokenType.LPAREN);
            const E_val = this.E();
            this.match(Parser.TokenType.RPAREN);
            return E_val;
        } else {
            throw new Error(`Syntax error in P: Unexpected token ${this.currentToken.type}`);
        }
    }
}

function calculate() {
    const expr = prompt("Введите математическое выражение:");
    if (expr === null || expr.trim() === "") {
        alert("Вы не ввели выражение");
        return;
    }
    
    const parser = new Parser();
    try {
        const result = parser.calculateExpression(expr);
        alert("Результат: " + result);
    } catch (error) {
        alert("Ошибка: " + error.message);
    }
}