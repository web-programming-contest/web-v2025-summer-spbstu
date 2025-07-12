import { useContext } from "react";
import { deleteOperation } from "../functions/deleteOperation";
import { VariablesContext } from "../AppContext/VariablesContext";
import { ButtonsContext } from "../AppContext/ButtonsContext";

export function DeleteOperationButton({ operation }: { operation: string }) {
  const context = useContext(VariablesContext);
  if (!context) {
    throw new Error("что-то не так с контекстом переменных");
  }
  const { 
    argument, 
    setArgument, 
    expression, 
    setExpression, 
    setResult, 
    isSecondOperand,
    setIsSecondOperand,
    isError,
    setIsError
   } = context;

  const buttons = useContext(ButtonsContext);
  if (!buttons) {
      throw new Error("что-то не так с контекстом кнопок");
    }

  const buttonRef = 
    operation === "CE" ? buttons.clearBtn :
    operation === "C" ? buttons.clearAllBtn :
    operation === "<=" ? buttons.deleteBtn :
    null;

  return (
    <button
      ref={buttonRef}
      onClick={() =>
        deleteOperation({
          operation: operation,
          expression: expression,
          setExpression: setExpression,
          value: argument,
          setValue: setArgument,
          setResult: setResult,
          isSecondOperand: isSecondOperand,
          setIsSecondOperand: setIsSecondOperand,
          isError: isError,
          setIsError: setIsError
        })
      }
    >
      {operation}
    </button>
  );
}
