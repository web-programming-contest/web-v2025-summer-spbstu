import { calculate } from "./calculate";

 type getResultArgs = {
  expression: string;
  setExpression: React.Dispatch<React.SetStateAction<string>>;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  result: string;
  setResult: React.Dispatch<React.SetStateAction<string>>;
  isSecondOperand: React.MutableRefObject<boolean>;
  isError: React.MutableRefObject<boolean>;
};

export function getResult(args: getResultArgs) {
    if(!args.value){ //нажали равно без второго аргумента
        if("+-*/".includes(args.expression[args.expression.length-2])){
            args.setExpression(args.expression.slice(0, args.expression.length-3));
            args.setValue(calculate(args.expression.slice(0, args.expression.length-3), args.isError))
            args.isSecondOperand.current=false;
        }
        else{
            args.setExpression(args.expression);
            args.setValue(calculate(args.expression, args.isError))
        }
        return;
    }
    if(args.isSecondOperand.current){
        let operation: string = "";
        const tempRes = args.result;
        if(args.expression[args.expression.length-1] !== "="){ //если ввели оба аргумента
            operation = args.expression[args.expression.length-2]
            args.setExpression(args.expression + args.value + " =");
            args.setResult(args.value);
            args.setValue(calculate(tempRes + ` ${operation} ` + args.value, args.isError));
        }
        else{
            // если нажимают равно подряд    
            
            operation = args.expression[args.expression.length-args.result.length -4];
            args.setExpression(args.value + ` ${operation} ` + args.result + " =");
            args.setValue(calculate(args.value + ` ${operation} ` + args.result, args.isError));
        }
    }
    // else{
    //     args.setExpression(args.value);
    // }
}