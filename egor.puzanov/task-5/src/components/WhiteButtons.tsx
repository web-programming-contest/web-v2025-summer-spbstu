import { NumButton } from "./NumButton";
import { UnaryOperationButton } from "./UnaryOperationButton";
import { PlaceDotButton } from "./PlaceDotButton";

export function WhiteButtons() {
  return (
    <div className="forNumButtons">
      <NumButton num={9} />
      <NumButton num={8} />
      <NumButton num={7} />
      <NumButton num={6} />
      <NumButton num={5} />
      <NumButton num={4} />
      <NumButton num={3} />
      <NumButton num={2} />
      <NumButton num={1} />
      <PlaceDotButton />
      <NumButton num={0} />
      <UnaryOperationButton operation={"+/-"} />
    </div>
  );
}
