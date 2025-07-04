type deleteOperationArgs = {
  operation: string;
  expression: string;
  setExpression: React.Dispatch<React.SetStateAction<string>>;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  setResult: React.Dispatch<React.SetStateAction<string>>;
  isSecondOperand: React.MutableRefObject<boolean>;
  isError: React.MutableRefObject<boolean>;
};

//обрабатывает разные способы удаления

export function deleteOperation(args: deleteOperationArgs) {
  //если  ошибка или получили результат - удалить всё
  if(args.expression[args.expression.length - 1] === "=" || args.isError.current){
      args.setValue("0");
      args.setExpression("");
      args.setResult("0");
      args.isSecondOperand.current = false;
      args.isError.current = false;
    return;
  }
  switch (args.operation) {
    case "CE": {
      args.setValue("0");
      if(!args.isSecondOperand.current){
        args.setExpression("");
      }
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
