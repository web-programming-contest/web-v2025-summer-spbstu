type InputCharacteristics = {
    value: string;
    onChange: (num: string) => void;
    styleClass: string;
    IsChangeble?: boolean;
};

export function ArgInput({ value, onChange, styleClass, IsChangeble }: InputCharacteristics) {

  return (
    <input
        value={value}
        onChange={(e) => onChange(e.target.value)} 
        readOnly={IsChangeble}
        className={styleClass}
    />
  );
}