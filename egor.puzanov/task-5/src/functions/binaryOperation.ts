import { calculate } from "./calculate";

type binaryOperationArgs = {
  operation: string;
  value: string;
  setValue: (value: string) => void;
  isSecondOperand: React.MutableRefObject<boolean>;
  expression: string;
  setExpression: (value: string) => void;
  result: string;
  setResult: (value: string) => void;
  dotPlaced: React.MutableRefObject<boolean>;
};


export function binaryOperation(args: binaryOperationArgs) {
  const tempValue = args.value;
  const previousOperation = args.expression[args.expression.length - 2];
  switch (args.operation) {
    case "+": {
          if (args.value) {
            args.setExpression(args.expression + args.value + ' + ');
            args.setValue("");
            if (args.isSecondOperand.current) {
              args.setResult(
                calculate(args.result + ` ${previousOperation} ` + tempValue)
              );
            } 
            else {
              args.setResult(tempValue);
            }
            args.isSecondOperand.current = true;
          } 
          else {
            if("/*".includes(previousOperation)){
              args.setExpression(args.expression.slice(1, args.expression.length - 4) + ' + ');
            }
            else{
              args.setExpression(args.expression.slice(0, args.expression.length - 2) + ' + ');
            }
          }
          break;
        }
        case "-": {
          if (args.value) {
            args.setExpression(args.expression + args.value + ' - ');
            args.setValue("");
            if (args.isSecondOperand.current) {
              args.setResult(
                calculate(args.result + ` ${previousOperation} ` + tempValue)
              );
            } 
            else {
              args.setResult(tempValue);
            }
            args.isSecondOperand.current = true;
          } 
          else {
            if("/*".includes(previousOperation)){
              args.setExpression(args.expression.slice(1, args.expression.length - 4) + ' - ');
            }
            else{
              args.setExpression(args.expression.slice(0, args.expression.length - 3) + ' - ');
            }
          }
          break;
        }
        case "*": {
          if (args.value) {
            args.setExpression('(' + args.expression + args.value + ') * ');
            args.setValue("");
            if (args.isSecondOperand.current) {
              args.setResult(
                calculate(args.result + ` ${previousOperation} ` + tempValue)
              );
            } 
            else {
              args.setResult(tempValue);
            }
            args.isSecondOperand.current = true;
          } 
          else {
            if("/*".includes(previousOperation)){
              args.setExpression(args.expression.slice(0, args.expression.length - 3) + ' * ');
            }
            else{
              args.setExpression('('+args.expression.slice(0, args.expression.length - 3) + ') * ');
            }
          }
          break;
        }
        case "/": {
          if (args.value) {
            args.setExpression('(' + args.expression + args.value + ') / ');
            args.setValue("");
            if (args.isSecondOperand.current) {
              args.setResult(
                calculate(args.result + ` ${previousOperation} ` + tempValue)
              );
            } 
            else {
              args.setResult(tempValue);
            }
            args.isSecondOperand.current = true;
          } 
          else {
            if("/*".includes(previousOperation)){
              args.setExpression(args.expression.slice(0, args.expression.length - 3) + ' / ');
            }
            else{
              args.setExpression('('+args.expression.slice(0, args.expression.length - 3) + ') / ');
            }
          }
          break;
        }
        default: {
          throw new Error("что-то пошло не так");
        }
      }
    }
    
    
    // export function binaryOperation(args: binaryOperationArgs) {
    //   if ("+-/*".includes(args.operation)) {
    //     if (args.value) {
    //       const previousOperation = args.expression[args.expression.length - 2];
    
    //       args.setExpression(args.expression + args.value + ` ${args.operation} `);
    //       const tempValue = args.value;
    //       args.setValue("");
    //       if (args.isSecondOperand.current) {
    //         console.log(args.result + ` ${previousOperation} ` + tempValue);
    //         args.setResult(
    //           calculate(args.result + ` ${previousOperation} ` + tempValue)
    //         );
    //       } else {
    //         args.setResult(tempValue);
    //       }
    //       args.isSecondOperand.current = true;
    //     } else {
    //       args.setExpression(
    //         args.expression.slice(0, args.expression.length - 2) +
    //           ` ${args.operation} `
    //       );
    //     }
    //   } else {
    //     throw new Error("что-то пошло не так");
    //   }
    // }