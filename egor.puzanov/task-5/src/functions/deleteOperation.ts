type deleteOperationArgs = {
  operation: string;
  setExpression: React.Dispatch<React.SetStateAction<string>>;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  setResult: React.Dispatch<React.SetStateAction<string>>;
  isSecondOperand: React.MutableRefObject<boolean>;
};

export function deleteOperation(args: deleteOperationArgs) {
  switch (args.operation) {
    case "CE": {
      args.setValue("0");
      break;
    }
    case "C": {
      args.setValue("0");
      args.setExpression("");
      args.setResult("0");
      args.isSecondOperand.current = false;
      break;
    }
    case "<=": {
      if(args.value.length > 1){
        if (args.value[args.value.length - 2] === ".") {
          args.setValue(args.value.slice(0, args.value.length - 2));
        } else {
          args.setValue(args.value.slice(0, args.value.length - 1));
        }
      }
      else{
        args.setValue("0");
      }
      break;
    }
    default: {
      throw new Error("что-то пошло не так");
    }
  }
}
