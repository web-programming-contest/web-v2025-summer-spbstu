import { useContext } from "react";
import { unaryOperation } from "../functions/unaryOperation";
import { VariablesContext } from "../AppContext/VariablesContext";

export function UnaryOperationButton({ operation }: { operation: string }) {
  const context = useContext(VariablesContext);
  if (!context) {
    throw new Error("что-то не так с контекстом переменных");
  }
  const { argument, setArgument, isSecondOperand, calculateArgument } = context;
  return (
    <button
      onClick={() =>
        unaryOperation({
          operation: operation,
          value: argument,
          setValue: setArgument,
          isSecondOperand: isSecondOperand,
          isCalculatable: calculateArgument,
        })
      }
    >
      {operation}
    </button>
  );
}
