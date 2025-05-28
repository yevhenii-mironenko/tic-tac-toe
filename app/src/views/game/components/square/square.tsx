type Props = {
  onSquareClick: () => void;
  value: number | null;
};

export function Square({ onSquareClick, value }: Props) {
  return (
    <button className="square" onClick={onSquareClick}>
      {/* {value} */}
    </button>
  );
}
