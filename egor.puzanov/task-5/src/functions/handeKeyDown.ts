import { type buttonsContextType } from "../AppContext/ButtonsContext";

export function handeKeyDown(event: KeyboardEvent, buttons: buttonsContextType ){
    switch (event.key) {
        case "1": {
            if(buttons.oneBtn.current){
                buttons.oneBtn.current.click();
                buttons.oneBtn.current.classList.add('active');
                setTimeout(() => buttons.oneBtn.current!.classList.remove('active'), 100);
            }
            break;
        }
        case "2": {
            if(buttons.twoBtn.current){
                buttons.twoBtn.current.click();
                buttons.twoBtn.current.classList.add('active');
                setTimeout(() => buttons.twoBtn.current!.classList.remove('active'), 100);
            }
            break;
        }
        case "3": {
            if(buttons.threeBtn.current){
                buttons.threeBtn.current.click();
                buttons.threeBtn.current.classList.add('active');
                setTimeout(() => buttons.threeBtn.current!.classList.remove('active'), 100);
            }
            break;
        }
        case "4": {
            if(buttons.fourBtn.current){
                buttons.fourBtn.current.click();
                buttons.fourBtn.current.classList.add('active');
                setTimeout(() => buttons.fourBtn.current!.classList.remove('active'), 100);
            }
            break;
        }
        case "5": {
            if(buttons.fiveBtn.current){
                buttons.fiveBtn.current.click();
                buttons.fiveBtn.current.classList.add('active');
                setTimeout(() => buttons.fiveBtn.current!.classList.remove('active'), 100);
            }
            break;
        }
        case "%": {
            if(buttons.precentageBtn.current){
                buttons.precentageBtn.current.click();
                buttons.precentageBtn.current.classList.add('active');
                setTimeout(() => buttons.precentageBtn.current!.classList.remove('active'), 100);
            }
            break;
        }
        case "6": {
            if(buttons.sixBtn.current){
                buttons.sixBtn.current.click();
                buttons.sixBtn.current.classList.add('active');
                setTimeout(() => buttons.sixBtn.current!.classList.remove('active'), 100);
                }
            break;
        }
        case "^": {
            if(buttons.squareBtn.current){
                buttons.squareBtn.current.click();
                buttons.squareBtn.current.classList.add('active');
                setTimeout(() => buttons.squareBtn.current!.classList.remove('active'), 100);
            }
            break;
        }
        case "7": {
            if(buttons.sevenBtn.current){
                buttons.sevenBtn.current.click();
                buttons.sevenBtn.current.classList.add('active');
                setTimeout(() => buttons.sevenBtn.current!.classList.remove('active'), 100);
            }
            break;
        }
        case "8": {
            if(buttons.eightBtn.current){
                buttons.eightBtn.current.click();
                buttons.eightBtn.current.classList.add('active');
                setTimeout(() => buttons.eightBtn.current!.classList.remove('active'), 100);
            }
            break;
        }
        case "9": {
            if(buttons.nineBtn.current){
                buttons.nineBtn.current.click();
                buttons.nineBtn.current.classList.add('active');
                setTimeout(() => buttons.nineBtn.current!.classList.remove('active'), 100);
            }
            break;
        }
        case "0": {
            if(buttons.zeroBtn.current){
                buttons.zeroBtn.current.click();
                buttons.zeroBtn.current.classList.add('active');
                setTimeout(() => buttons.zeroBtn.current!.classList.remove('active'), 100);
            }
            break;
        }
        case "c": {//латинская
            if(buttons.clearBtn.current){
                buttons.clearBtn.current.click();
                buttons.clearBtn.current.classList.add('active');
                setTimeout(() => buttons.clearBtn.current!.classList.remove('active'), 100);
            }
            break;
        }
        case "C": {//латинская
            if(buttons.clearAllBtn.current){
                buttons.clearAllBtn.current.click();
                buttons.clearAllBtn.current.classList.add('active');
                setTimeout(() => buttons.clearAllBtn.current!.classList.remove('active'), 100);
            }
            break;
        }
        case "с": {//русская
            if(buttons.clearBtn.current){
                buttons.clearBtn.current.click();
                buttons.clearBtn.current.classList.add('active');
                setTimeout(() => buttons.clearBtn.current!.classList.remove('active'), 100);
            }
            break;
        }
        case "С": {//русская
            if(buttons.clearAllBtn.current){
                buttons.clearAllBtn.current.click();
                buttons.clearAllBtn.current.classList.add('active');
                setTimeout(() => buttons.clearAllBtn.current!.classList.remove('active'), 100);
            }
            break;
        }
        case "Backspace": {
            if(buttons.deleteBtn.current){
                buttons.deleteBtn.current.click();
                buttons.deleteBtn.current.classList.add('active');
                setTimeout(() => buttons.deleteBtn.current!.classList.remove('active'), 100);
            }
            break;
        }
        case "\\": {
            if(buttons.reverseBtn.current){
                buttons.reverseBtn.current.click();
                buttons.reverseBtn.current.classList.add('active');
                setTimeout(() => buttons.reverseBtn.current!.classList.remove('active'), 100);
            }
            break;
        }
        case "r": {
            if(buttons.rootBtn.current){
                buttons.rootBtn.current.click();
                buttons.rootBtn.current.classList.add('active');
                setTimeout(() => buttons.rootBtn.current!.classList.remove('active'), 100);
            }
            break;
        }
        case "к": {
            if(buttons.rootBtn.current){
                buttons.rootBtn.current.click();
                buttons.rootBtn.current.classList.add('active');
                setTimeout(() => buttons.rootBtn.current!.classList.remove('active'), 100);
            }
            break;
        }
        case "/": {
            if(buttons.divideBtn.current){
                buttons.divideBtn.current.click();
                buttons.divideBtn.current.classList.add('active');
                setTimeout(() => buttons.divideBtn.current!.classList.remove('active'), 100);
            }
            break;
        }
        case "*": {
            if(buttons.multiplyBtn.current){
                buttons.multiplyBtn.current.click();
                buttons.multiplyBtn.current.classList.add('active');
                setTimeout(() => buttons.multiplyBtn.current!.classList.remove('active'), 100);
            }
            break;
        }
        case "+": {
            if(buttons.plusBtn.current){
                buttons.plusBtn.current.click();
                buttons.plusBtn.current.classList.add('active');
                setTimeout(() => buttons.plusBtn.current!.classList.remove('active'), 100);
            }
            break;
        }
        case "-": {
            if(buttons.minusBtn.current){
                buttons.minusBtn.current.click();
                buttons.minusBtn.current.classList.add('active');
                setTimeout(() => buttons.minusBtn.current!.classList.remove('active'), 100);
            }
            break;
        }
        case "=": {
            if(buttons.calculateBtn.current){
                buttons.calculateBtn.current.click();
                buttons.calculateBtn.current.classList.add('active');
                setTimeout(() => buttons.calculateBtn.current!.classList.remove('active'), 100);
            }
            break;
        }
        case "Enter": {
            if(buttons.calculateBtn.current){
                buttons.calculateBtn.current.click();
                buttons.calculateBtn.current.classList.add('active');
                setTimeout(() => buttons.calculateBtn.current!.classList.remove('active'), 100);
            }
            break;
        }
        case "_": {
            if(buttons.changeSignBtn.current){
                buttons.changeSignBtn.current.click();
                buttons.changeSignBtn.current.classList.add('active');
                setTimeout(() => buttons.changeSignBtn.current!.classList.remove('active'), 100);
            }
            break;
        }
        case ".": {
            if(buttons.placeDotBtn.current){
                buttons.placeDotBtn.current.click();
                buttons.placeDotBtn.current.classList.add('active');
                setTimeout(() => buttons.placeDotBtn.current!.classList.remove('active'), 100);
            }
            break;
        }
        case ",": {
            if(buttons.placeDotBtn.current){
                buttons.placeDotBtn.current.click();
                buttons.placeDotBtn.current.classList.add('active');
                setTimeout(() => buttons.placeDotBtn.current!.classList.remove('active'), 100);
            }
            break;
        }
        
    }
}

