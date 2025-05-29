import { Board } from "./components/board/board";
import { useGame } from "./components/hooks/use-game";
import style from "./components/styles/game.module.scss";

type Props = {
  gameMode: "vsAI" | "vsFriend";
  onRestart: () => void;
};

export function Game({ gameMode, onRestart }: Props) {
  const { models, operations } = useGame(gameMode);

  return (
    <div className={style.gameContainer}>
      <h1>{gameMode === "vsAI" ? "Гра з AI" : "Гра з другом"}</h1>
      <div className="game">
        <div className="game-board">
          <Board
            xIsNext={models.xIsNext}
            squares={models.currentSquares}
            onPlay={operations.handlePlay}
            winner={models.winner}
            winningLine={models.winningLine}
            isDraw={models.isDraw}
          />
        </div>
      </div>
      <button onClick={onRestart}>На головну</button>
    </div>
  );
}
