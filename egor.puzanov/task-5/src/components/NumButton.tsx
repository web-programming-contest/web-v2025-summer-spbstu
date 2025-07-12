import { useContext } from "react";
import { addDigit } from "../functions/addDigit";
import { VariablesContext } from "../AppContext/VariablesContext";
import { ButtonsContext } from "../AppContext/ButtonsContext";

export function NumButton({ num }: { num: number }) {
  const context = useContext(VariablesContext);
  if (!context) {
    throw new Error("что-то не так с контекстом переменных");
  }
  const { argument, setArgument, expression, isError } = context;

  const buttons = useContext(ButtonsContext);
  if (!buttons) {
    throw new Error("что-то не так с контекстом кнопок");
  }
  const { clearAllBtn } = buttons;

  const numBtnArray = [
    buttons.zeroBtn,
    buttons.oneBtn,
    buttons.twoBtn,
    buttons.threeBtn,
    buttons.fourBtn,
    buttons.fiveBtn,
    buttons.sixBtn,
    buttons.sevenBtn,
    buttons.eightBtn,
    buttons.nineBtn,
  ];

  return (
    <button
      disabled={isError}
      onClick={() =>
        addDigit({
          num: num,
          value: argument,
          setValue: setArgument,
          expression: expression,
          clearAllBtn: clearAllBtn,
        })
      }
      ref={num > -1 && num < 10 ? numBtnArray[num] : null}
    >
      {num}
    </button>
  );
}
