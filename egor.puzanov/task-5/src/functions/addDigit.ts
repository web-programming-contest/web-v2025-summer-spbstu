type addDigitArgs = {
  num: number;
  value: string;
  setValue: (value: string) => void;
  clearAllBtn: React.MutableRefObject<HTMLButtonElement|null>;
  expression: string
};

export function addDigit(args: addDigitArgs) {
  if(args.expression[args.expression.length - 1] === "="){
    args.clearAllBtn.current?.click();
  }
  else{
    if (args.value.length < 16)
      if (args.value !== "0") {
        args.setValue(args.value + args.num.toString());
      } else {
        args.setValue(args.num.toString());
      }
  }
  }