import { useContext } from "react";
import { addDot } from "../functions/addDot";
import { VariablesContext } from "../AppContext/VariablesContext";
import { ButtonsContext } from "../AppContext/ButtonsContext";

export function PlaceDotButton() {
  const context = useContext(VariablesContext);
  if (!context) {
    throw new Error("что-то не так с контекстом переменных");
  }
  const { 
    argument, 
    setArgument, 
    dotPlaced, 
    isError, 
    setDotPlaced
   } = context;

  const buttons = useContext(ButtonsContext);
  if (!buttons) {
    throw new Error("что-то не так с контекстом кнопок");
  }

  return (
    <button
      ref={buttons.placeDotBtn}
      disabled={isError}
      onClick={() =>
        addDot({
          value: argument,
          setValue: setArgument,
          dotPlaced: dotPlaced,
          setDotPlaced: setDotPlaced,
        })
      }
    >
      .
    </button>
  );
}