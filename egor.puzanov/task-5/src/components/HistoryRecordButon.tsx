// import { useContext, useEffect, useRef } from "react";
import { useContext } from "react";
import { VariablesContext, type historyRecord } from "../AppContext/VariablesContext";
// import { adjustFontSizeComp } from "../functions/adjustFontSize";


export function HistoryRecordButon({record, index}: {record: historyRecord, index: number}) {

    const context = useContext(VariablesContext);
    if (!context) {
      throw new Error("что-то не так с контекстом переменных");
    }
    
    const {
        setExpression, 
        setArgument, 
        setResult, 
        isSecondOperand
    } = context;

    //закомментированное было тут
    
    return (
        <button
        key={index.toString()}
        className="historyRecordBtn"
        onClick={() =>{
            setExpression(record.expression);
            setResult(record.result)
            setTimeout(() => setArgument(record.argument), 50);
            isSecondOperand.current = true;
        }}
        >
                <div className="recordDiv">
                    <div 
                      className="expressionDiv"
                      //   ref={setExpressionDivRef}
                      >
                        {record.expression}
                    </div>
                    <div 
                      className="argumentDiv"
                      //   ref={setArgumentDivRef}
                      >
                        {record.argument}
                    </div>
                </div>
        </button>
    )
}


// const expressionDivRefs = useRef<HTMLDivElement[]>([]);
// const argumentDivRefs = useRef<HTMLDivElement[]>([]);

// function setArgumentDivRef(el: HTMLDivElement | null) {
//     if (el) {
//         if(!argumentDivRefs.current.includes(el)) {
//             argumentDivRefs.current.push(el);
//         }
//     }
//     else{
//         argumentDivRefs.current = argumentDivRefs.current.filter(refEl => refEl !== null);
//     }
// }

// function setExpressionDivRef(el: HTMLDivElement | null) {
//     if (el) {
//         if(!expressionDivRefs.current.includes(el)) {
//             expressionDivRefs.current.push(el);
//         }
//     }
//     else{
//         expressionDivRefs.current = expressionDivRefs.current.filter(refEl => refEl !== null);
//     }
// }
// useEffect(() => {
//     expressionDivRefs.current.forEach( div => {
//         setTimeout(() => adjustFontSizeComp(div, 15), 150);
//     });
//     argumentDivRefs.current.forEach(  div => {
//         setTimeout(() => adjustFontSizeComp(div, 20), 150);
//     });
// }, []);