import { useContext } from "react";
import { getResult } from "../functions/getResult";
import { VariablesContext } from "../AppContext/VariablesContext";
import { ButtonsContext } from "../AppContext/ButtonsContext";

export function GetResultButton() {
  const context = useContext(VariablesContext);
  if (!context) {
    throw new Error("что-то не так с контекстом переменных");
  }
  const {
    expression,
    setExpression,
    argument,
    setArgument,
    result,
    setResult,
    isSecondOperand,
    isError,
    setIsError,
    historyRecords,
    setHistoryRecords
  } = context;
  
  const buttons = useContext(ButtonsContext);
  if (!buttons) {
    throw new Error("что-то не так с контекстом кнопок");
  }

  return (
    <button
      ref={buttons.calculateBtn}
      disabled={isError}
      onClick={() =>
        getResult({
          expression: expression,
          setExpression: setExpression,
          value: argument,
          setValue: setArgument,
          result: result,
          setResult: setResult,
          isSecondOperand: isSecondOperand,
          isError: isError,
          setIsError: setIsError,
          historyRecords: historyRecords,
          setHistoryRecords: setHistoryRecords
        })
      }
      className="calutateButton"
    >
      =
    </button>
  );
}
