import * as math from "mathjs";

//функция считает выражение

export function calculate(expression: string, setIsError: React.Dispatch<React.SetStateAction<boolean>>): string {
    try{
        return  math.evaluate(expression).toString();
    }
    catch{
        setIsError(true);
        return "Введенное выражение некорректно";
    }
  }