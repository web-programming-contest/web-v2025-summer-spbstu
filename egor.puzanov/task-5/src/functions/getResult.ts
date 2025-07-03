import { calculate } from "./calculate";

 type getResultArgs = {
  expression: string;
  setExpression: React.Dispatch<React.SetStateAction<string>>;
  value: string;
  result: string;
  setResult: React.Dispatch<React.SetStateAction<string>>;
  isSecondOperand: React.MutableRefObject<boolean>;
};

export function getResult(args: getResultArgs) {
    if(args.isSecondOperand){
        let operation: string = "";
        if(args.expression[args.expression.length-1] !== "="){
            operation = args.expression[args.expression.length-2]
            args.setExpression(args.expression + args.value + " =");
            // args.setResult(calculate(args.result + ` ${operation} ` + args.value));
        }
        else{
            operation = args.expression[args.expression.length-args.value.length -4];
            args.setExpression(args.result + ` ${operation} ` + args.value + " =");
        }
        args.setResult(calculate(args.result + ` ${operation} ` + args.value));

    }
}