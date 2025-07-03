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
import { handeKeyDown } from "./functions/handeKeyDown";

//TODO Сделать истрию

function App() {
  const [expression, setExpression] = useState("");
  const [argument, setArgument] = useState("0");
  const [result, setResult] = useState("0");
  const [shownValue, setShownValue] = useState("0");

  const isSecondOperand = useRef<boolean>(false);
  const dotPlaced = useRef<boolean>(false);
  const calculateArgument = useRef<boolean>(false);
  const isError = useRef<boolean>(false);

  const pRefArgument = useRef<HTMLParagraphElement>(null);
  const pRefExpression = useRef<HTMLParagraphElement>(null);
  
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
    isError
  };

  const buttons: buttonsContextType = useButtons();

  //обновление отображения когда меняется аргумент или результат
  useEffect(() => {
    if (calculateArgument.current) {
      const temp: string = calculate(argument, isError);
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
    if(expression[expression.length -1] !== "="){
      setShownValue(result);
      if (argument.includes(".")) {
        dotPlaced.current = true;
      } else {
        dotPlaced.current = false;
      }
    }
  }, [result]);

  //подгонка размера шрифтов
  useEffect(() => {
    const p = pRefArgument.current;
    if (!p) return;

    let currentFontSize = 40;
    const containerWidth = p.clientWidth;

   
    while (p.scrollWidth > containerWidth && currentFontSize > 5) {
      currentFontSize -= 1;
      p.style.fontSize = `${currentFontSize}px`;
    }
    // p.style.fontSize = `${currentFontSize}px`;
  }, [shownValue]);

    useEffect(() => {
    const p = pRefExpression.current;
    if (!p) return;

    let currentFontSize = 15;
    const containerWidth = p.clientWidth;

   
    while (p.scrollWidth > containerWidth && currentFontSize > 5) {
      currentFontSize -= 1;
      p.style.fontSize = `${currentFontSize}px`;
    }
    // p.style.fontSize = `${currentFontSize}px`;
  }, [expression]);

  //обработка нажатий клавиш
  useEffect(() => {
    const shouldBecalledOnce = (e: KeyboardEvent) => {
      handeKeyDown(e, buttons);
    }
    document.addEventListener("keydown", shouldBecalledOnce)

    return () => { //чтобы не применялось дважды
      document.removeEventListener("keydown", shouldBecalledOnce);
    };
  }, []);

  return (
    <>
      <VariablesContext value={context}>
        <h1>Калькулятор</h1>
        <p ref={pRefExpression} className="expression">{expression}</p>
        <p ref={pRefArgument} className="argumentParagraph">{shownValue}</p>
        <ButtonsContext value={buttons}>
        <div className="forButtons">
          <BinaryOperationButton operation="%"/>

          <DeleteOperationButton operation="CE" />
          <DeleteOperationButton operation="C" />
          <DeleteOperationButton operation="<=" />

          <UnaryOperationButton operation="1/x" />
          <UnaryOperationButton operation="x^2" />
          <UnaryOperationButton operation="√x" />

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
