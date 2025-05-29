import style from "../styles/game.module.scss";

type Props = {
  onSquareClick: () => void;
  value: string | null;
  highlight: boolean;
};

export function Square({ onSquareClick, value, highlight }: Props) {
  const baseClass =
    value === "X"
      ? style.buttonX
      : value === "O"
      ? style.buttonY
      : style.button;
  const highlightClass = highlight ? style.highlight : "";

  return (
    <button
      className={`${baseClass} ${highlightClass}`}
      onClick={onSquareClick}
    >
      <span>{value}</span>
    </button>
  );
}
