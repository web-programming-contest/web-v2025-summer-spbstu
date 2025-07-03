import * as math from "mathjs";

export function calculate(expression: string): string {
    try{
        return  math.evaluate(expression).toString();
    }
    catch{
        return "Введенное выражение некорректно";
    }
  }