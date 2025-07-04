type addDotArgs = {
  value: string;
  setValue: (value: string) => void;
  dotPlaced: React.MutableRefObject<boolean>;
 }
 
//функция добавляет точку к числу

 export function addDot(args: addDotArgs) {
    if (args.value === "") { //нажали точку после того как нажали операцию
      args.setValue(args.value + "0.");
      args.dotPlaced.current = true;
    } else if (!args.dotPlaced.current) {
      args.setValue(args.value + ".");
      args.dotPlaced.current = true;
    }
  }