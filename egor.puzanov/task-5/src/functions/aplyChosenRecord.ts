
import { type historyRecord } from "../AppContext/VariablesContext";
type aplyChosenRecordArgs = {
    record: historyRecord,
    setExpression: React.Dispatch<React.SetStateAction<string>>
    setResult: React.Dispatch<React.SetStateAction<string>>;
    setArgument: React.Dispatch<React.SetStateAction<string>>;
    setIsSecondOperand: React.Dispatch<React.SetStateAction<boolean>>;

}
export function aplyChosenRecord(args: aplyChosenRecordArgs){
    args.setExpression(args.record.expression);
    args.setResult(args.record.result)
    setTimeout(() => args.setArgument(args.record.argument), 50);
    args.setIsSecondOperand(true);
}