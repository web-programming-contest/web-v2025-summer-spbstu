import { useContext } from "react";
import { binaryOperation } from "../functions/binaryOperation";
import { VariablesContext } from "../AppContext/VariablesContext";
import { ButtonsContext } from "../AppContext/ButtonsContext";

export function BinaryOperationButton({ operation }: { operation: string }) {
  const context = useContext(VariablesContext);
  if (!context) {
    throw new Error("что-то не так с контекстом переменных");
  }
  const {
    argument,
    setArgument,
    isSecondOperand,
    setIsSecondOperand,
    expression,
    setExpression,
    result,
    setResult,
    isError,
    setIsError
  } = context;

  const buttons = useContext(ButtonsContext);
  if (!buttons) {
      throw new Error("что-то не так с контекстом кнопок");
    }

  const buttonRef = 
    operation === "+" ? buttons.plusBtn :
    operation === "-" ? buttons.minusBtn :
    operation === "/" ? buttons.divideBtn :
    operation === "*" ? buttons.multiplyBtn :
    operation === "%" ? buttons.precentageBtn :
    null;

  return (
    <button
      ref={buttonRef}
      disabled={isError}
      onClick={() =>
        binaryOperation({
            operation: operation,
            value: argument,
            setValue: setArgument,
            isSecondOperand: isSecondOperand,
            setIsSecondOperand,
            expression: expression,
            setExpression: setExpression,
            result: result,
            setResult: setResult,
            setIsError: setIsError
        })
      }
    >
      {operation}
    </button>
  );
}
