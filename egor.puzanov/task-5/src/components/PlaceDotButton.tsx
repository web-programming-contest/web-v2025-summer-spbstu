import { useContext } from "react";
import { addDot } from "../functions/addDot";
import { VariablesContext } from "../AppContext/VariablesContext";

export function PlaceDotButton() {
  const context = useContext(VariablesContext);
  if (!context) {
    throw new Error("что-то не так с контекстом переменных");
  }
  const { argument, setArgument, dotPlaced } = context;
  return (
    <button
      onClick={() => addDot({ value: argument, setValue: setArgument, dotPlaced: dotPlaced })}
    >
      .
    </button>
  );
}