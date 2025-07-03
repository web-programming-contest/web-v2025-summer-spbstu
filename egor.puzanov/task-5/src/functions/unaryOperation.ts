type unaryOperationArg = {
  operation: string;
  value: string;
  setValue: (value: string) => void;
  isSecondOperand: React.MutableRefObject<boolean>;
  isCalculatable: React.MutableRefObject<boolean>;
};

export function unaryOperation(args: unaryOperationArg ) {
  args.isCalculatable.current = true;
  switch (args.operation) {
    case "1/x": {
      if (args.value) {
        args.setValue("1/(" + args.value + ")");
      } 
      break;
    }
    case "x^2": {
      args.setValue("("+args.value+")^2");
      break;
    }
    case "sqrt(x)": {
      args.setValue("sqrt("+args.value+")");
      break;
    }
    case "%": {
      break;
    }
    case "+/-": {
      if (args.value.length === 0 && args.isSecondOperand.current) {
        args.setValue("0.");
      }
      if (args.value[0] === "-") {
        if (args.value[1] === "(" && args.value[args.value.length - 1] === ")") {
          args.setValue(args.value.substring(2, args.value.length - 1));
        } else {
          args.setValue(args.value.substring(1));
        }
      } else {
        args.setValue("-(" + args.value + ")");
      }
      break;
    }
    default: {
      throw new Error("что-то пошло не так");
    }
  }
  
}
