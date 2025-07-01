import { useState } from "react";
import * as math from "mathjs";
import "./App.css";
import { NumButton } from "./components/NumButton";
import { OperationButton } from "./components/OperationButton";
import { ArgInput } from "./components/ArgInput";

function App() {
  const [expression, setExpression] = useState("");
  const [argument, setArgument] = useState("0");
  const [shownValue, setShownValue] = useState("0");

  const [isSecondOperand, setIsSecondOperand] = useState(false);
  const [dotPlaced, setDotPlaced] = useState(false);

  function addDigit(num: number) {
    if (argument.length < 16)
      if (argument !== "0") {
        setArgument(argument + num.toString());
        setShownValue(argument + num.toString());
      } else {
        setArgument(num.toString());
        setShownValue(num.toString());
      }
  }

  function addDot() {
    if (argument === "") {
      setArgument(argument + "0.");
      setShownValue(argument + "0.");
      setDotPlaced(true);
    } else if (!dotPlaced) {
      setArgument(argument + ".");
      setShownValue(argument + ".");
      setDotPlaced(true);
    }
  }

  function unaryOperation(operation: string) {
    switch (operation) {
      case "1/x": {
        if (argument === "") {
          break;
        } else {
          setArgument("1/(" + argument + ")");
          setShownValue(calculate("1/(" + argument + ")").toString());
        }
        break;
      }
      case "x^2": {
        break;
      }
      case "sqrt(x)": {
        break;
      }
      case "%": {
        break;
      }
      case "+/-": {
        if (argument.length === 0 && isSecondOperand) {
          setArgument("0.");
          setShownValue("0.");
        }
        if (argument[0] === "-") {
          setArgument(argument.substring(1));
          setShownValue(argument.substring(1));
        } else {
          setArgument("-" + argument);
          setShownValue("-" + argument);
        }
        break;
      }
      default: {
        throw new Error("что-то пошло не так");
      }
    }
  }
  function binaryOperation(operation: string) {
    return;
  }

  function calculate(expression: string): number {
    return math.evaluate(expression);
  }

  return (
    <>
      <h1>Калькулятор</h1>
      <ArgInput
        value={shownValue}
        onChange={setShownValue}
        styleClass="argInput"
      />
      <div className="forButtons">
        <OperationButton
          shownValue="%"
          onClick={unaryOperation}
          styleClass="outerButton"
        />
        <OperationButton
          shownValue="CE"
          onClick={unaryOperation}
          styleClass="outerButton"
        />
        <OperationButton
          shownValue="C"
          onClick={unaryOperation}
          styleClass="outerButton"
        />
        <OperationButton
          shownValue="<="
          onClick={unaryOperation}
          styleClass="outerButton"
        />

        <OperationButton
          shownValue="1/x"
          onClick={unaryOperation}
          styleClass="outerButton"
        />
        <OperationButton
          shownValue="x^2"
          onClick={unaryOperation}
          styleClass="outerButton"
        />
        <OperationButton
          shownValue="sqrt(x)"
          onClick={unaryOperation}
          styleClass="outerButton"
        />
        <OperationButton
          shownValue="/"
          onClick={unaryOperation}
          styleClass="outerButton"
        />
        <OperationButton
          shownValue="X"
          onClick={unaryOperation}
          styleClass="outerButton"
        />
        <OperationButton
          shownValue="-"
          onClick={unaryOperation}
          styleClass="outerButton"
        />
        <OperationButton
          shownValue="+"
          onClick={unaryOperation}
          styleClass="outerButton"
        />
        <OperationButton
          shownValue="="
          onClick={calculate}
          styleClass="outerButton"
        />
        <div className="forNumButtons">
          <NumButton num={9} onClick={addDigit} />
          <NumButton num={8} onClick={addDigit} />
          <NumButton num={7} onClick={addDigit} />
          <NumButton num={6} onClick={addDigit} />
          <NumButton num={5} onClick={addDigit} />
          <NumButton num={4} onClick={addDigit} />
          <NumButton num={3} onClick={addDigit} />
          <NumButton num={2} onClick={addDigit} />
          <NumButton num={1} onClick={addDigit} />
          <OperationButton shownValue="." onClick={addDot} />
          <NumButton num={0} onClick={addDigit} />
          <OperationButton shownValue="+/-" onClick={unaryOperation} />
        </div>
      </div>
    </>
  );
}

export default App;
