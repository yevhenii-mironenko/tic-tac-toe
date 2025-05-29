import { Board } from "./components/board/board";
import { useGame } from "./components/hooks/use-game";
import style from "./components/styles/game.module.scss";

type Props = {
  gameMode: "vsFriend" | "vsWeakAI" | "vsStrongAI";
  onGoHome: () => void;
};

export function Game({ gameMode, onGoHome }: Props) {
  const { models, operations } = useGame(gameMode);

  return (
    <div className={style.gameContainer}>
      <h1>
        {gameMode === "vsFriend" && "Гра з другом"}
        {gameMode === "vsWeakAI" && "Гра з слабким ШІ"}
        {gameMode === "vsStrongAI" && "Гра з сильним ШІ"}
      </h1>
      <div className="game">
        <div className="game-board">
          <Board
            xIsNext={models.xIsNext}
            squares={models.currentSquares}
            onPlay={operations.handlePlay}
            winner={models.winner}
            winningLine={models.winningLine}
            isDraw={models.isDraw}
            gameMode={gameMode}
          />
        </div>
      </div>
      <button onClick={onGoHome}>На головну</button>
      <button onClick={operations.handleRestartGame}>Рестарт</button>
    </div>
  );
}
