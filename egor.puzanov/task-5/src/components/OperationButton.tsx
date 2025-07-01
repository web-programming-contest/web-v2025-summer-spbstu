type ButtonCharacteristics = {
    shownValue: string;
    onClick: (operation: string) => void;
    styleClass?: string;
};

export function OperationButton({shownValue, onClick, styleClass}: ButtonCharacteristics) {
  return (
    <button
        onClick={() => onClick(shownValue)}
        className={styleClass}
    >
        {shownValue}
    </button>
  );
}