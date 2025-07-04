
import { type historyRecord } from "../AppContext/VariablesContext";

//функции для работы с записями истории

export function updateList(records: historyRecord[], 
                           record: historyRecord,
                           setHistoryRecords: React.Dispatch<React.SetStateAction<historyRecord[]>>) {
        
    records.push(record);
    setHistoryRecords(records);
    localStorage.setItem("historyRecords", JSON.stringify(records));
}

export function clearList(setHistoryRecords: React.Dispatch<React.SetStateAction<historyRecord[]>>) {
        setHistoryRecords([]);
        localStorage.setItem("historyRecords", JSON.stringify([]));
    
    }

export function setList(records: historyRecord[],
                        setHistoryRecords: React.Dispatch<React.SetStateAction<historyRecord[]>>) {
        const temp: historyRecord[] = [];
        records.forEach(record => temp.push(record))
        setHistoryRecords(temp);
        localStorage.setItem("historyRecords", JSON.stringify(temp));
    }