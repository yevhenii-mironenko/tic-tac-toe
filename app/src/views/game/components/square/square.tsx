type Props = {
  onSquareClick: () => void;
  value: string | null;
};

export function Square({ onSquareClick, value }: Props) {
  return (
    <button onClick={onSquareClick}>
      <span>{value}</span>
    </button>
  );
}
