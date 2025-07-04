type unaryOperationArg = {
  operation: string;
  value: string;
  setValue: (value: string) => void;
  setExpression: (value: string) => void;
  isSecondOperand: React.MutableRefObject<boolean>;
  isCalculatable: React.MutableRefObject<boolean>;
};

//обрабатывает операции над аргуметом

export function unaryOperation(args: unaryOperationArg ) {
  if (args.value) {
  args.isCalculatable.current = true; //выводить на экран посчитанный результат, а не выражение
    switch (args.operation) {
      case "1/x": {
          if(!args.isSecondOperand.current){
            args.setExpression("1/(" + args.value + ")");
          }
          args.setValue("1/(" + args.value + ")");
        break;
      }
      case "x^2": {
          if(!args.isSecondOperand.current){
              args.setExpression("("+args.value+")^2");
            }
          args.setValue("("+args.value+")^2");
      break;
      }
      case "√x": {
          if(!args.isSecondOperand.current){
              args.setExpression("sqrt("+args.value+")");
            }
          args.setValue("sqrt("+args.value+")");
        break;
      }
      case "+/-": {
        if (args.value[0] === "-") {
          if (args.value[1] === "(" && args.value[args.value.length - 1] === ")") { //возможно стоит убрать
            args.setValue(args.value.substring(2, args.value.length - 1));
          } else {
            args.setValue(args.value.substring(1)); //минус исчезает
          }
        } else {
          args.setValue("-" + args.value); //минус добавляется
        }
        break;
      }
      default: {
        throw new Error("что-то пошло не так");
      }
    }
  }
  
}
