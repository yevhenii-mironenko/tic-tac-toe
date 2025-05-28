import { Square } from "../square/square";
import { useBoard } from "./hooks/use-board";
import style from "../styles/game.module.scss";

type BoartType = (string | null)[];

type Props = {
  xIsNext: boolean;
  squares: BoartType;
  onPlay: (squares: BoartType) => void;
  onCalculateWinner: (squares: BoartType) => string | null;
};

export function Board({ xIsNext, squares, onPlay, onCalculateWinner }: Props) {
  const { models, operations } = useBoard({
    xIsNext,
    squares,
    onPlay,
    onCalculateWinner,
  });
  return (
    <>
      <div className={style.boardStatus}>{models.status}</div>
      <div className={style.boardContainer}>
        <div className={style.boardRow}>
          <Square
            value={squares[0]}
            onSquareClick={() => operations.handleClick(0)}
          />
          <Square
            value={squares[1]}
            onSquareClick={() => operations.handleClick(1)}
          />
          <Square
            value={squares[2]}
            onSquareClick={() => operations.handleClick(2)}
          />
        </div>
        <div className={style.boardRow}>
          <Square
            value={squares[3]}
            onSquareClick={() => operations.handleClick(3)}
          />
          <Square
            value={squares[4]}
            onSquareClick={() => operations.handleClick(4)}
          />
          <Square
            value={squares[5]}
            onSquareClick={() => operations.handleClick(5)}
          />
        </div>
        <div className={style.boardRow}>
          <Square
            value={squares[6]}
            onSquareClick={() => operations.handleClick(6)}
          />
          <Square
            value={squares[7]}
            onSquareClick={() => operations.handleClick(7)}
          />
          <Square
            value={squares[8]}
            onSquareClick={() => operations.handleClick(8)}
          />
        </div>
      </div>
    </>
  );
}
