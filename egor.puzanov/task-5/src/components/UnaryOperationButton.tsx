import { useContext } from "react";
import { unaryOperation } from "../functions/unaryOperation";
import { VariablesContext } from "../AppContext/VariablesContext";
import { ButtonsContext } from "../AppContext/ButtonsContext";

export function UnaryOperationButton({ operation }: { operation: string }) {
  const context = useContext(VariablesContext);
  if (!context) {
    throw new Error("что-то не так с контекстом переменных");
  }
  const { 
    argument, 
    setArgument, 
    isSecondOperand, 
    calculateArgument, 
    setExpression,
    isError 
  } = context;

  const buttons = useContext(ButtonsContext);
  if (!buttons) {
      throw new Error("что-то не так с контекстом кнопок");
    }

  const buttonRef = 
    operation === "1/x" ? buttons.reverseBtn :
    operation === "x^2" ? buttons.squareBtn :
    operation === "√x" ? buttons.rootBtn :
    operation === "+/-" ? buttons.changeSignBtn :
    null;
  return (
    <button
      ref={buttonRef}
      disabled={isError.current}
      onClick={() =>
        unaryOperation({
          operation: operation,
          value: argument,
          setValue: setArgument,
          setExpression: setExpression,
          isSecondOperand: isSecondOperand,
          isCalculatable: calculateArgument,
        })
      }
    >
      {operation}
    </button>
  );
}
