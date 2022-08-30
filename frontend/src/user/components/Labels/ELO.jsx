import { CaretUpFill, CaretDownFill } from "react-bootstrap-icons";

export function PositiveElo(props) {
  return (
    <>
      <span className="positive-elo">
        <CaretUpFill size={12} color="green" />
        <br />
        {props.content}
      </span>
    </>
  );
}

export function NegativeElo(props) {
  return (
    <>
      <span className="mt-1 negative-elo">
        <CaretDownFill size={12} color="red" />
        <br />
        {props.content}
      </span>
    </>
  );
}
