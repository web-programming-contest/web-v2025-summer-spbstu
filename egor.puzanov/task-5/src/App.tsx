import { useEffect, useRef, useState } from "react";

import "./App.css";
import "./additionalCss/paragraphs.css";
import "./additionalCss/buttons.css"
import "./additionalCss/forHistory.css";

import { VariablesContext, type variablesContextType, type historyRecord } from "./AppContext/VariablesContext";
import { type buttonsContextType, useButtons, ButtonsContext } from "./AppContext/ButtonsContext";

import { WhiteButtons } from "./components/WhiteButtons";
import { UnaryOperationButton } from "./components/UnaryOperationButton";
import { BinaryOperationButton } from "./components/BinaryOperationButton";
import { DeleteOperationButton } from "./components/DeleteOperationButton";
import { GetResultButton } from "./components/GetResultButton";
import { ShowHistoryButton } from "./components/ShowHistoryButton";
import { HistoryContainer } from "./components/HistoryContainer";

import { calculate } from "./functions/calculate";
import { handeKeyDown } from "./functions/handeKeyDown";
import { setList } from "./functions/recordsListOperations";
import { adjustFontSizeRef } from "./functions/adjustFontSize";

//TODO Написать комментарии ко всему

function App() {
  const [expression, setExpression] = useState("");
  const [argument, setArgument] = useState("0");
  const [result, setResult] = useState("0");
  const [shownValue, setShownValue] = useState("0");
  const [historyRecords, setHistoryRecords] = useState<historyRecord[]>([]);

  const isSecondOperand = useRef<boolean>(false);
  const dotPlaced = useRef<boolean>(false);
  const calculateArgument = useRef<boolean>(false);
  const isError = useRef<boolean>(false);

  const pRefArgument = useRef<HTMLParagraphElement>(null);
  const pRefExpression = useRef<HTMLParagraphElement>(null);
  const forHistoryRef = useRef<HTMLParagraphElement>(null);
  
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
    isError,
    historyRecords,
    setHistoryRecords
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
    adjustFontSizeRef(pRefArgument, 40);
  }, [shownValue]);

    useEffect(() => {
    adjustFontSizeRef(pRefExpression, 15);
  }, [expression]);

  //обработка нажатий клавиш и чтение истори
  useEffect(() => {
    const shouldBecalledOnce = (e: KeyboardEvent) => {
      handeKeyDown(e, buttons);
    }
    document.addEventListener("keydown", shouldBecalledOnce);

    const storedHistory: historyRecord[] = JSON.parse(localStorage.getItem("historyRecords") || "[]")
    setList(storedHistory, setHistoryRecords)

    return () => { //чтобы не применялось дважды
      document.removeEventListener("keydown", shouldBecalledOnce);
      // clearList(setHistoryRecords);
    };
  }, []);

  return (
    <>
      <VariablesContext value={context}>
        <ButtonsContext value={buttons}>
        <h1>Калькулятор</h1>
        <ShowHistoryButton ref={forHistoryRef}/>
        <p ref={pRefExpression} className="expression">{expression}</p>
        <p ref={pRefArgument} className="argumentParagraph">{shownValue}</p>
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
        <HistoryContainer ref={forHistoryRef}/>
        </ButtonsContext>
      </VariablesContext>
    </>
  );
}

export default App;
