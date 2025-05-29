import { Square } from "../square/square";
import { useBoard } from "./hooks/use-board";
import style from "../styles/game.module.scss";

type SquareValue = "X" | "O" | null;
type BoardType = SquareValue[];

type Props = {
  xIsNext: boolean;
  squares: BoardType;
  onPlay: (nextSquares: BoardType) => void;
  winner: string | null;
  winningLine: number[];
  isDraw: boolean;
};

export function Board({
  xIsNext,
  squares,
  onPlay,
  winner,
  winningLine,
  isDraw,
}: Props) {
  const { models, operations } = useBoard({
    xIsNext,
    squares,
    onPlay,
    winner,
    isDraw,
  });

  function renderSquare(i: number) {
    return (
      <Square
        key={i}
        value={squares[i]}
        onSquareClick={() => operations.handleClick(i)}
        highlight={winningLine.includes(i)}
      />
    );
  }

  const boardRows = [0, 1, 2].map((row) => {
    const start = row * 3;
    return (
      <div key={row} className={style.boardRow}>
        {renderSquare(start)}
        {renderSquare(start + 1)}
        {renderSquare(start + 2)}
      </div>
    );
  });

  return (
    <>
      <div className={style.boardStatus}>{models.status}</div>
      <div className={style.boardContainer}>{boardRows}</div>
    </>
  );
}
