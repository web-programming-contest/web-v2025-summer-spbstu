import { useContext } from "react";
import { binaryOperation } from "../functions/binaryOperation";
import { VariablesContext } from "../AppContext/VariablesContext";

export function BinaryOperationButton({ operation }: { operation: string }) {
  const context = useContext(VariablesContext);
  if (!context) {
    throw new Error("что-то не так с контекстом переменных");
  }
  const {
    argument,
    setArgument,
    isSecondOperand,
    expression,
    setExpression,
    result,
    setResult,
    dotPlaced,
  } = context;
  return (
    <button
      onClick={() =>
        binaryOperation({
            operation: operation,
            value: argument,
            setValue: setArgument,
            isSecondOperand: isSecondOperand,
            expression: expression,
            setExpression: setExpression,
            result: result,
            setResult: setResult,
            dotPlaced: dotPlaced,
        })
      }
    >
      {operation}
    </button>
  );
}
