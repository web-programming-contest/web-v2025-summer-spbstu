import { useContext } from "react";
import { VariablesContext } from "../AppContext/VariablesContext";
import { clearList } from "../functions/recordsListOperations";

import { HistoryRecordButon } from "./HistoryRecordButon";
export function HistoryContainer({ref}: {ref: React.RefObject<HTMLDivElement | null>}) {

    const context = useContext(VariablesContext);
    if (!context) {
      throw new Error("что-то не так с контекстом переменных");
    }

    const {
        historyRecords, 
        setHistoryRecords, 
    } = context;

    return (
        <div 
          id="forHistory" 
          ref={ref} 
          onClick={() => {
            if(ref.current) {
                ref.current.classList.toggle("clicked");
            }
          }}>
            {/* кнопка очистки истории */}
            <button
                className="historyRecordBtn deleteHistoryBtn"
                onClick={() =>{clearList(setHistoryRecords)}}
                >
                <div className="deleteHistoryDiv">
                    <span>Удалить записи</span>
                </div>
            </button>
            {/* кнопки записей истории */}
            {historyRecords.map((record, index) => (
                <HistoryRecordButon record={record} index={index} />
            ))}
        </div>
    )
}
