import React, {createContext, useRef} from "react";

export type buttonsContextType = {
    precentageBtn: React.MutableRefObject<HTMLButtonElement|null>;
    clearAllBtn: React.MutableRefObject<HTMLButtonElement|null>;
    clearBtn: React.MutableRefObject<HTMLButtonElement|null>;
    deleteBtn: React.MutableRefObject<HTMLButtonElement|null>;
    reverseBtn: React.MutableRefObject<HTMLButtonElement|null>;
    squareBtn: React.MutableRefObject<HTMLButtonElement|null>;
    rootBtn: React.MutableRefObject<HTMLButtonElement|null>;
    divideBtn: React.MutableRefObject<HTMLButtonElement|null>;
    multiplyBtn: React.MutableRefObject<HTMLButtonElement|null>;
    plusBtn: React.MutableRefObject<HTMLButtonElement|null>;
    minusBtn: React.MutableRefObject<HTMLButtonElement|null>;
    calculateBtn: React.MutableRefObject<HTMLButtonElement|null>;
    nineBtn: React.MutableRefObject<HTMLButtonElement|null>;
    eightBtn: React.MutableRefObject<HTMLButtonElement|null>;
    sevenBtn: React.MutableRefObject<HTMLButtonElement|null>;
    sixBtn: React.MutableRefObject<HTMLButtonElement|null>;
    fiveBtn: React.MutableRefObject<HTMLButtonElement|null>;
    fourBtn: React.MutableRefObject<HTMLButtonElement|null>;
    threeBtn: React.MutableRefObject<HTMLButtonElement|null>;
    twoBtn: React.MutableRefObject<HTMLButtonElement|null>;
    oneBtn: React.MutableRefObject<HTMLButtonElement|null>;
    zeroBtn: React.MutableRefObject<HTMLButtonElement|null>;
    changeSignBtn: React.MutableRefObject<HTMLButtonElement|null>;
    placeDotBtn: React.MutableRefObject<HTMLButtonElement|null>;
}

export const ButtonsContext = createContext<buttonsContextType|null>(null);

export function useButtons() {
      const precentageBtn = useRef<HTMLButtonElement|null>(null);
      const clearAllBtn = useRef<HTMLButtonElement|null>(null);
      const clearBtn = useRef<HTMLButtonElement|null>(null);
      const deleteBtn = useRef<HTMLButtonElement|null>(null);
      const reverseBtn = useRef<HTMLButtonElement|null>(null);
      const squareBtn = useRef<HTMLButtonElement|null>(null);
      const rootBtn = useRef<HTMLButtonElement|null>(null);
      const divideBtn = useRef<HTMLButtonElement|null>(null);
      const multiplyBtn = useRef<HTMLButtonElement|null>(null);
      const plusBtn = useRef<HTMLButtonElement|null>(null);
      const minusBtn = useRef<HTMLButtonElement|null>(null);
      const calculateBtn = useRef<HTMLButtonElement|null>(null);
      const nineBtn = useRef<HTMLButtonElement|null>(null);
      const eightBtn = useRef<HTMLButtonElement|null>(null);
      const sevenBtn = useRef<HTMLButtonElement|null>(null);
      const sixBtn = useRef<HTMLButtonElement|null>(null);
      const fiveBtn = useRef<HTMLButtonElement|null>(null);
      const fourBtn = useRef<HTMLButtonElement|null>(null);
      const threeBtn = useRef<HTMLButtonElement|null>(null);
      const twoBtn = useRef<HTMLButtonElement|null>(null);
      const oneBtn = useRef<HTMLButtonElement|null>(null);
      const zeroBtn = useRef<HTMLButtonElement|null>(null);
      const changeSignBtn = useRef<HTMLButtonElement|null>(null);
      const placeDotBtn = useRef<HTMLButtonElement|null>(null);

      const buttons: buttonsContextType = {
            precentageBtn,
            clearAllBtn,
            clearBtn,
            deleteBtn,
            reverseBtn,
            squareBtn,
            rootBtn,
            divideBtn,
            multiplyBtn,
            plusBtn,
            minusBtn,
            calculateBtn,
            nineBtn,
            eightBtn,
            sevenBtn,
            sixBtn,
            fiveBtn,
            fourBtn,
            threeBtn,
            twoBtn,
            oneBtn,
            zeroBtn,
            changeSignBtn,
            placeDotBtn
            }
    return buttons;
}