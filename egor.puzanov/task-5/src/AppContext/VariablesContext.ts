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
  isSecondOperand: boolean;
  setIsSecondOperand: React.Dispatch<React.SetStateAction<boolean>>;
  dotPlaced: boolean;
  setDotPlaced: React.Dispatch<React.SetStateAction<boolean>>;
  calculateArgument: boolean;
  setCalculateArgument: React.Dispatch<React.SetStateAction<boolean>>;
  isError: boolean;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
  historyRecords: historyRecord[];
  setHistoryRecords: React.Dispatch<React.SetStateAction<historyRecord[]>>;
};

export const VariablesContext = createContext<variablesContextType|null>(null);

export type historyRecord = {
    expression: string;
    result: string;
    argument: string;
}