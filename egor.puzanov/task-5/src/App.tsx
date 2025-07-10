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
  //все что может отображаться
  const [expression, setExpression] = useState("");
  const [argument, setArgument] = useState("0");
  const [result, setResult] = useState("0");
  const [shownValue, setShownValue] = useState("0");
  const [historyRecords, setHistoryRecords] = useState<historyRecord[]>([]);

  //все что не может отображаться
  const [isSecondOperand, setIsSecondOperand] = useState(false);
  const [dotPlaced, setDotPlaced] = useState(false);
  const [calculateArgument, setCalculateArgument] = useState(false);
  const [isError, setIsError] = useState(false);

  //ссылки на элеметы для отображения
  const pRefArgument = useRef<HTMLParagraphElement>(null);
  const pRefExpression = useRef<HTMLParagraphElement>(null);
  const forHistoryRef = useRef<HTMLParagraphElement>(null);
  
  //чтобы было видно в элементах ниже
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
    setIsSecondOperand,
    dotPlaced,
    setDotPlaced,
    calculateArgument,
    setCalculateArgument,
    isError,
    setIsError,
    historyRecords,
    setHistoryRecords
  };

  //ссылки на все кнопки
  const buttons: buttonsContextType = useButtons();

  //обновление отображения когда меняется аргумент или результат
  useEffect(() => {
    if (calculateArgument) { //если операция только над аргументом
      const temp: string = calculate(argument, setIsError);
      setShownValue(temp);
      setCalculateArgument(false);
      if (temp.includes(".")) {
        setDotPlaced(true);
      } else {
        setDotPlaced(false);
      }
    } else {
      setShownValue(argument);
      if (argument.includes(".")) {
        setDotPlaced(true);
      } else {
        setDotPlaced(false);
      }
    }
  }, [argument]);

  //вывод результата предыдущих подсчетов
  useEffect(() => {
    if(expression[expression.length -1] !== "="){ //не выводить result тк они поменялись местами с argument
      setShownValue(result);
      if (argument.includes(".")) {
        setDotPlaced(true);
      } else {
        setDotPlaced(false);
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

  //обработка нажатий клавиш и чтение истории
  useEffect(() => {
    const handlekeys = (e: KeyboardEvent) => {
      e.preventDefault(); 
      handeKeyDown(e, buttons);
    }
    document.addEventListener("keydown", handlekeys);

    const storedHistory: historyRecord[] = JSON.parse(localStorage.getItem("historyRecords") || "[]")
    setList(storedHistory, setHistoryRecords)

    return () => { 
      //чтобы когда удаляется компонент, с него снимался EventListener,
      //и на одном компоненте не было несколько одинаковых обработчиков
      document.removeEventListener("keydown", handlekeys); 
    };
  }, []);

  return (
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
          <WhiteButtons /> {/* кнопки в левом нижнем углу  */}
        </div>
        <HistoryContainer ref={forHistoryRef}/>
        </ButtonsContext>
      </VariablesContext>
  );
}

export default App;
