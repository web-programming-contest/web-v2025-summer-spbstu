import { calculate } from "./calculate";
import { updateList } from "./recordsListOperations";
import { type historyRecord } from "../AppContext/VariablesContext";

 type getResultArgs = {
  expression: string;
  setExpression: React.Dispatch<React.SetStateAction<string>>;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  result: string;
  setResult: React.Dispatch<React.SetStateAction<string>>;
  isSecondOperand: React.MutableRefObject<boolean>;
  isError: React.MutableRefObject<boolean>;
  historyRecords: historyRecord[]
  setHistoryRecords: React.Dispatch<React.SetStateAction<historyRecord[]>>;
};

//функция обрабатывает нажате на кнопку равно

export function getResult(args: getResultArgs) {
    if(!args.value){ //нажали равно без второго аргумента
        if("+-*/".includes(args.expression[args.expression.length-2])){
            args.setExpression(args.expression.slice(0, args.expression.length-3) + " ="); //убираем последнюю операцию
            const newValue = calculate(args.expression.slice(0, args.expression.length-3), args.isError);
            args.setValue(newValue)
            if(!args.isError.current){ //добавить запись в историю
                const record: historyRecord = {
                      expression: args.expression.slice(0, args.expression.length-3)  + " =",
                      result: "0",
                      argument: newValue,
                    };
                updateList(args.historyRecords, record, args.setHistoryRecords);

            }
        }
        else{ //возможно стоит убрать
            args.setExpression(args.expression);
            args.setValue(calculate(args.expression, args.isError))
        }
        return;
    }
    if(args.isSecondOperand.current){
        let operation: string = "";
        const tempRes = args.result;
        if(args.expression[args.expression.length-1] !== "="){ //если нажали равно в первый раз
            operation = args.expression[args.expression.length-2]
            args.setExpression(args.expression + args.value + " =");
            args.setResult(args.value); //записать прошлое значение аргумента
            const newValue = calculate(tempRes + ` ${operation} ` + args.value, args.isError)
            args.setValue(newValue); //записать новое значение аргумента для отображения

            if (!args.isError.current) {
                const record: historyRecord = {
                expression: args.expression + args.value + " =",
                result: args.value,
                argument: newValue,
                };
                updateList(args.historyRecords, record, args.setHistoryRecords);
            }
        }
        else{
            // если нажимают равно подряд    
            
            operation = args.expression[args.expression.length-args.result.length - 4]; //обрезать с учетом равно
            args.setExpression(args.value + ` ${operation} ` + args.result + " =");
            const newValue = calculate(args.value + ` ${operation} ` + args.result, args.isError);
            args.setValue(newValue);

            if (!args.isError.current) {
                const record: historyRecord = {
                  expression: args.value + ` ${operation} ` + args.result + " =",
                  result: tempRes,
                  argument: newValue,
                };
                updateList(args.historyRecords, record, args.setHistoryRecords);
            } 
        }
    }
    // else{
    //     args.setExpression(args.value);
    // }
}