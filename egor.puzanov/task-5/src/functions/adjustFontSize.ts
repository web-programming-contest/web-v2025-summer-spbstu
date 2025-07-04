
//функции подгоняют размер шрифта под размеры контейнера


export function adjustFontSizeRef(ref: React.RefObject<HTMLElement | null>, maxSize: number) { //если элемент передается через useRef
    const element = ref.current;
    if (!element) return;

    let currentFontSize = maxSize;
    const containerWidth = element.clientWidth;

    element.style.fontSize = `${currentFontSize}px`;
   
    while (element.scrollWidth > containerWidth && currentFontSize > 5) {
      currentFontSize -= 1;
      element.style.fontSize = `${currentFontSize}px`;
    }
}

export function adjustFontSizeComp(obj: HTMLElement | null, maxSize: number) { //если элемент передается как элемент
    if (!obj) return;

    let currentFontSize = maxSize;
    const containerWidth = obj.clientWidth;
    console.log(obj.clientWidth)
    console.log(obj.offsetWidth)
    console.log(obj.scrollWidth)
    
    obj.style.fontSize = `${currentFontSize}px`;
   
    while (obj.scrollWidth > containerWidth && currentFontSize > 5) {
      currentFontSize -= 1;
      obj.style.fontSize = `${currentFontSize}px`;
    }
}