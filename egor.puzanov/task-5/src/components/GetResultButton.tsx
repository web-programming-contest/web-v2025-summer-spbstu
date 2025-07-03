import { useContext } from "react";
import { getResult } from "../functions/getResult";
import { VariablesContext } from "../AppContext/VariablesContext";

export function GetResultButton() {
  const context = useContext(VariablesContext);
  if (!context) {
    throw new Error("что-то не так с контекстом переменных");
  }
  const { expression, setExpression, argument, setArgument, result, setResult, isSecondOperand } = context;
  return (
    <button
      onClick={() =>
        getResult({
          expression: expression,
          setExpression: setExpression,
          value: argument,
          setValue: setArgument,
          result: result,
          setResult: setResult,
          isSecondOperand: isSecondOperand
        })
      }
    >
      =
    </button>
  );
}
