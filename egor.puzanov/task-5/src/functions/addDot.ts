type addDotArgs = {
  value: string;
  setValue: (value: string) => void;
  dotPlaced: boolean;
  setDotPlaced: React.Dispatch<React.SetStateAction<boolean>>;
 }
 
//функция добавляет точку к числу

 export function addDot(args: addDotArgs) {
    if (args.value === "") { //нажали точку после того как нажали операцию
      args.setValue(args.value + "0.");
      args.setDotPlaced(true);
    } else if (!args.dotPlaced) {
      args.setValue(args.value + ".");
      args.setDotPlaced(true);
    }
  }