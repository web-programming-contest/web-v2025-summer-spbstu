type ButtonCharacteristics = {
    num: number;
    onClick: (num: number) => void;
    styleClass?: string;
};

export function NumButton({num, onClick, styleClass}: ButtonCharacteristics) {
  return (
    <button
        onClick={() => onClick(num)}
        className={styleClass}
    >
        {num}
    </button>
  );
}