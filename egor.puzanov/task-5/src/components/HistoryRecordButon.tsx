import { useContext } from "react";
import { VariablesContext, type historyRecord } from "../AppContext/VariablesContext";
import { aplyChosenRecord } from "../functions/aplyChosenRecord";

export function HistoryRecordButon({record, index}: {record: historyRecord, index: number}) {

    const context = useContext(VariablesContext);
    if (!context) {
      throw new Error("что-то не так с контекстом переменных");
    }
    
    const {
        setExpression, 
        setArgument, 
        setResult, 
        setIsSecondOperand
    } = context;
    
    return (
        <button
        key={index}
        className="historyRecordBtn"
        onClick={() =>{
            aplyChosenRecord({record: record,
              setExpression: setExpression,
              setResult: setResult,
              setArgument: setArgument,
              setIsSecondOperand: setIsSecondOperand
            })
        }}
        >
          <div className="recordDiv">
              <div 
                className="expressionDiv"
                >
                  {record.expression}
              </div>
              <div 
                className="argumentDiv"
                >
                  {record.argument}
              </div>
          </div>
        </button>
    )
}

