function isBalanced(str) {
    const braces = "(){}[]";
    let stack = [];
    for (let i = 0; i < str.length; i++) {
        let ch = str[i];
        let index = braces.indexOf(ch);
        if (index >= 0) {
            if (index % 2 === 1) {
                if (!stack.length) return false;
                let last = stack.pop();
                if (last !== braces[index - 1]) return false;
            } else {
                stack.push(ch);
            }
        }
    }
    return !stack.length;
}

let line = prompt('Enter line:');
console.log('Line:',line);
console.log(isBalanced(line));