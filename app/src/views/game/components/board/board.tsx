import { Square } from "../square/square";
import { useBoard } from "./hooks/use-board";
import style from "../styles/game.module.scss";

export function Board() {
  const { operations } = useBoard();
  return (
    <div className={style.boardContainer}>
      <div className={style.boardRow}>
        <Square value={0} onSquareClick={() => operations.handleClick(0)} />
        <Square value={1} onSquareClick={() => operations.handleClick(1)} />
        <Square value={2} onSquareClick={() => operations.handleClick(2)} />
      </div>
      <div className={style.boardRow}>
        <Square value={3} onSquareClick={() => operations.handleClick(3)} />
        <Square value={4} onSquareClick={() => operations.handleClick(4)} />
        <Square value={5} onSquareClick={() => operations.handleClick(5)} />
      </div>
      <div className={style.boardRow}>
        <Square value={6} onSquareClick={() => operations.handleClick(6)} />
        <Square value={7} onSquareClick={() => operations.handleClick(7)} />
        <Square value={8} onSquareClick={() => operations.handleClick(8)} />
      </div>
    </div>
  );
}
