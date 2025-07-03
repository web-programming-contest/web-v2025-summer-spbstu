type addDotArgs = {
  value: string;
  setValue: (value: string) => void;
  dotPlaced: React.MutableRefObject<boolean>;
  // setDotPlaced: (value: boolean) => void;
 }
 
 export function addDot(args: addDotArgs) {
    if (args.value === "") {
      args.setValue(args.value + "0.");
      args.dotPlaced.current = true;
    } else if (!args.dotPlaced.current) {
      args.setValue(args.value + ".");
      args.dotPlaced.current = true;
    }
  }