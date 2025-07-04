import React, {createContext} from "react";

export type variablesContextType = {
  expression: string;
  setExpression: React.Dispatch<React.SetStateAction<string>>;
  argument: string;
  setArgument: React.Dispatch<React.SetStateAction<string>>;
  result: string;
  setResult: React.Dispatch<React.SetStateAction<string>>;
  shownValue: string;
  setShownValue: React.Dispatch<React.SetStateAction<string>>;
  isSecondOperand: React.MutableRefObject<boolean>;
  dotPlaced: React.MutableRefObject<boolean>;
  calculateArgument: React.MutableRefObject<boolean>;
  isError: React.MutableRefObject<boolean>;
  historyRecords: historyRecord[];
  setHistoryRecords: React.Dispatch<React.SetStateAction<historyRecord[]>>;
};

export const VariablesContext = createContext<variablesContextType|null>(null);

export type historyRecord = {
    expression: string;
    result: string;
    argument: string;
}