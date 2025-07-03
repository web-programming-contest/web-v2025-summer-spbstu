import { type buttonsContextType } from "../AppContext/ButtonsContext";

export function handeKeyDown(event: KeyboardEvent, buttons: buttonsContextType ){
    switch (event.key) {
        case "1": {
            if(buttons.oneBtn.current){
                buttons.oneBtn.current.click();
            }
            break;
        }
        case "2": {
            if(buttons.twoBtn.current){
                buttons.twoBtn.current.click();
            }
            break;
        }
        case "3": {
            if(buttons.threeBtn.current){
                buttons.threeBtn.current.click();
            }
            break;
        }
        case "4": {
            if(buttons.fourBtn.current){
                buttons.fourBtn.current.click();
            }
            break;
        }
        case "5": {
            if(buttons.fiveBtn.current){
                buttons.fiveBtn.current.click();
            }
            break;
        }
        case "%": {
            if(buttons.precentageBtn.current){
                buttons.precentageBtn.current.click();
            }
            break;
        }
        case "6": {
            if(buttons.sixBtn.current){
                buttons.sixBtn.current.click();
                }
            break;
        }
        case "^": {
            if(buttons.squareBtn.current){
                buttons.squareBtn.current.click();
            }
            break;
        }
        case "7": {
            if(buttons.sevenBtn.current){
                buttons.sevenBtn.current.click();
            }
            break;
        }
        case "8": {
            if(buttons.eightBtn.current){
                buttons.eightBtn.current.click();
            }
            break;
        }
        case "9": {
            if(buttons.nineBtn.current){
                buttons.nineBtn.current.click();
            }
            break;
        }
        case "0": {
            if(buttons.zeroBtn.current){
                buttons.zeroBtn.current.click();
            }
            break;
        }
        case "c": {//латинская
            if(buttons.clearBtn.current){
                buttons.clearBtn.current.click();
            }
            break;
        }
        case "C": {//латинская
            if(buttons.clearAllBtn.current){
                buttons.clearAllBtn.current.click();
            }
            break;
        }
        case "с": {//русская
            if(buttons.clearBtn.current){
                buttons.clearBtn.current.click();
            }
            break;
        }
        case "С": {//русская
            if(buttons.clearAllBtn.current){
                buttons.clearAllBtn.current.click();
            }
            break;
        }
        case "Backspace": {
            if(buttons.deleteBtn.current){
                buttons.deleteBtn.current.click();
            }
            break;
        }
        case "\\": {
            if(buttons.reverseBtn.current){
                buttons.reverseBtn.current.click();
            }
            break;
        }
        case "r": {
            if(buttons.rootBtn.current){
                buttons.rootBtn.current.click();
            }
            break;
        }
        case "к": {
            if(buttons.rootBtn.current){
                buttons.rootBtn.current.click();
            }
            break;
        }
        case "/": {
            if(buttons.divideBtn.current){
                buttons.divideBtn.current.click();
            }
            break;
        }
        case "*": {
            if(buttons.multiplyBtn.current){
                buttons.multiplyBtn.current.click();
            }
            break;
        }
        case "+": {
            if(buttons.plusBtn.current){
                buttons.plusBtn.current.click();
            }
            break;
        }
        case "-": {
            if(buttons.minusBtn.current){
                buttons.minusBtn.current.click();
            }
            break;
        }
        case "=": {
            if(buttons.calculateBtn.current){
                buttons.calculateBtn.current.click();
            }
            break;
        }
        case "Enter": {
            if(buttons.calculateBtn.current){
                buttons.calculateBtn.current.click();
            }
            break;
        }
        case "_": {
            if(buttons.changeSignBtn.current){
                buttons.changeSignBtn.current.click();
            }
            break;
        }
        case ".": {
            if(buttons.placeDotBtn.current){
                buttons.placeDotBtn.current.click();
            }
            break;
        }
        case ",": {
            if(buttons.placeDotBtn.current){
                buttons.placeDotBtn.current.click();
            }
            break;
        }
        
    }
}

