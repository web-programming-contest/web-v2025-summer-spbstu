import * as math from "mathjs";

export function calculate(expression: string, isError: React.MutableRefObject<boolean>): string {
    try{
        return  math.evaluate(expression).toString();
    }
    catch{
        isError.current = true;
        return "Введенное выражение некорректно";
    }
  }