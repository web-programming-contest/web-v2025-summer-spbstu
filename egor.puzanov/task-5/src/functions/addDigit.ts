type addDigitArgs = {
  num: number;
  value: string;
  setValue: (value: string) => void;
  clearAllBtn: React.MutableRefObject<HTMLButtonElement|null>;
  expression: string
};

//функция добавляет цифру к числу

export function addDigit(args: addDigitArgs) {
  if(args.expression[args.expression.length - 1] === "="){ //очистить все после того, как посчитали выражение и начали вводить новое
    if(args.clearAllBtn.current){
        args.clearAllBtn.current.click();
    }
  }
  else{
    if (args.value.length < 16) //ограничение на размер числа
      if (args.value !== "0") {
        args.setValue(args.value + args.num.toString());
      } else {
        args.setValue(args.num.toString());
      }
  }
  }