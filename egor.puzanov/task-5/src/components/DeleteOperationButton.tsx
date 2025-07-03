import { useContext } from "react";
import { deleteOperation } from "../functions/deleteOperation";
import { VariablesContext } from "../AppContext/VariablesContext";

export function DeleteOperationButton({ operation }: { operation: string }) {
  const context = useContext(VariablesContext);
  if (!context) {
    throw new Error("что-то не так с контекстом переменных");
  }
  const { argument, setArgument, setExpression, setResult, isSecondOperand } =
    context;
  return (
    <button
      onClick={() =>
        deleteOperation({
          operation: operation,
          setExpression: setExpression,
          value: argument,
          setValue: setArgument,
          setResult: setResult,
          isSecondOperand: isSecondOperand
        })
      }
    >
      {operation}
    </button>
  );
}
