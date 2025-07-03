import { useEffect, useRef, useState } from "react";

import "./App.css";
import { VariablesContext, type variablesContextType } from "./AppContext/VariablesContext";

import { WhiteButtons } from "./components/WhiteButtons";
import { UnaryOperationButton } from "./components/UnaryOperationButton";
import { BinaryOperationButton } from "./components/BinaryOperationButton";
import { DeleteOperationButton } from "./components/DeleteOperationButton";
import { GetResultButton } from "./components/GetResultButton";

import { calculate } from "./functions/calculate";
import { type buttonsContextType, useButtons, ButtonsContext } from "./AppContext/ButtonsContext";

//TODO починить функции с одним аргументом при нажатии на равно несколько раз. Сделать истрию. Добавить чтение с клавиатуры

function App() {
  const [expression, setExpression] = useState("");
  const [argument, setArgument] = useState("0");
  const [result, setResult] = useState("0");
  const [shownValue, setShownValue] = useState("0");

  const isSecondOperand = useRef<boolean>(false);
  const dotPlaced = useRef<boolean>(false);
  const calculateArgument = useRef<boolean>(false);

  const context: variablesContextType = {
    expression,
    setExpression,
    argument,
    setArgument,
    result,
    setResult,
    shownValue,
    setShownValue,
    isSecondOperand,
    dotPlaced,
    calculateArgument,
  };

  const buttons: buttonsContextType = useButtons();

  useEffect(() => {
    if (calculateArgument.current) {
      const temp: string = calculate(argument).toString();
      setShownValue(temp);
      calculateArgument.current = false;
      if (temp.includes(".")) {
        dotPlaced.current = true;
      } else {
        dotPlaced.current = false;
      }
    } else {
      setShownValue(argument);
      if (argument.includes(".")) {
        dotPlaced.current = true;
      } else {
        dotPlaced.current = false;
      }
    }
  }, [argument]);

  useEffect(() => {
    setShownValue(result);
    if (result.includes(".")) {
      dotPlaced.current = true;
    } else {
      dotPlaced.current = false;
    }
  }, [result]);

  // const AppContext = useAppContext();

  return (
    <>
      <VariablesContext value={context}>
        <h1>Калькулятор</h1>
        <p className="expression">{expression}</p>
        <p className="argumentParagraph">{shownValue}</p>
        <ButtonsContext value={buttons}>
        <div className="forButtons">
          <UnaryOperationButton operation="%" />

          <DeleteOperationButton operation="CE" />
          <DeleteOperationButton operation="C" />
          <DeleteOperationButton operation="<=" />

          <UnaryOperationButton operation="1/x" />
          <UnaryOperationButton operation="x^2" />
          <UnaryOperationButton operation="sqrt(x)" />

          <BinaryOperationButton operation="/" />
          <BinaryOperationButton operation="*" />
          <BinaryOperationButton operation="+" />
          <BinaryOperationButton operation="-" />
          <GetResultButton />
          <WhiteButtons />
        </div>
        </ButtonsContext>
      </VariablesContext>
    </>
  );
}

export default App;
