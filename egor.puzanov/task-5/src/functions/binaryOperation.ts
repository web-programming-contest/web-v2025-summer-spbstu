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
  isError: React.MutableRefObject<boolean>;
};

//обработка операций с двумя аргументами

export function binaryOperation(args: binaryOperationArgs) {
  const tempValue = args.value;
  const previousOperation = args.expression[args.expression.length - 2];
  if(args.expression[args.expression.length - 1] === "="){ //если нажали операцию после того как посчитали выражение
    if("+-*/".includes(args.operation)){
      args.setExpression(args.value + ` ${args.operation} `) //подставить результат в качестве первого аргумента
      args.setResult(args.value);
      args.setValue("");
    }
    else if (args.operation === "%"){
      args.setValue(calculate(args.value+"/100", args.isError))
      args.setExpression(calculate(args.value+"/100", args.isError));
      args.isSecondOperand.current = false;
    }
    else{
      throw new Error("что-то пошло не так");
    }
    return;
  }
  switch (args.operation) {
    case "+": {
          if (args.value) {
            
            args.setExpression(
              !args.expression || "+-*/".includes(args.expression[args.expression.length-2]) ?
              args.expression + args.value + ' + ' : //если в выражении последяя операция или его нет
              args.expression + ' + ' //если в выражении поледним стоит число
            );
            args.setValue("");
            if (args.isSecondOperand.current) {
              args.setResult( //посчитать число слева от знака если кнопку нажимают несколько раз
                calculate(args.result + ` ${previousOperation} ` + tempValue, args.isError) 
              );
            } 
            else {
              args.setResult(calculate(tempValue, args.isError)); //посчитать введеное число
            }
            args.isSecondOperand.current = true;
          } 
          else { //если решили поменять операцию
            if("/*".includes(previousOperation)){
              args.setExpression(args.expression.slice(1, args.expression.length - 4) + ' + ');
            }
            else{
              args.setExpression(args.expression.slice(0, args.expression.length - 3) + ' + ');
            }
          }
          break;
        }
        case "-": {
          if (args.value) {
            args.setExpression(
              !args.expression || "+-*/".includes(args.expression[args.expression.length-2]) ?
              args.expression + args.value + ' - ' :
              args.expression + ' - '
            );
            args.setValue("");
            if (args.isSecondOperand.current) {
              args.setResult(
                calculate(args.result + ` ${previousOperation} ` + tempValue, args.isError)
              );
            } 
            else {
              args.setResult(calculate(tempValue, args.isError));
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
            args.setExpression(
              !args.expression || "+-*/".includes(args.expression[args.expression.length-2]) ?
              '(' + args.expression + args.value + ') * ' :
              '(' + args.expression  + ') * '
            );
            args.setValue("");
            if (args.isSecondOperand.current) {
              args.setResult(
                calculate(args.result + ` ${previousOperation} ` + tempValue, args.isError)
              );
            } 
            else {
              args.setResult(calculate(tempValue, args.isError));
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
            args.setExpression(
              !args.expression || "+-*/".includes(args.expression[args.expression.length-2]) ?
              '(' + args.expression + args.value + ') / ' :
              '(' + args.expression  + ') / '
            );
            args.setValue("");
            if (args.isSecondOperand.current) {
              args.setResult(
                calculate(args.result + ` ${previousOperation} ` + tempValue, args.isError)
              );
            } 
            else {
              args.setResult(calculate(tempValue, args.isError));
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
        case "%": {
          if(args.value){
            if("+-".includes(args.expression[args.expression.length-2])) { //если сложение/вычитание - прибавить n процентов
              args.setValue(calculate(args.expression.slice(0, args.expression.length - 3) + "/100*" + args.value, args.isError))
            }
            else if ("*/".includes(args.expression[args.expression.length-2])) {
              args.setValue(calculate(args.value+"/100", args.isError));
            }
            else{ //если умножение/деление - взять n процентов
              args.setValue(calculate(args.value+"/100", args.isError))
              args.setExpression(calculate(args.value+"/100", args.isError));
              args.isSecondOperand.current = false;

            }
          }
          break;
        }
        default: {
          throw new Error("что-то пошло не так");
        }
      }
    }