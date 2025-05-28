import { Board } from "./components/board/board";
import style from "./components/styles/game.module.scss";

type Props = {
  gameMode: "vsAI" | "vsFriend";
  onRestart: () => void;
};

export function Game({ gameMode, onRestart }: Props) {
  return (
    <div className={style.gameContainer}>
      <h1>Гра</h1>
      {gameMode === "vsAI" ? <p>Гра з AI</p> : <p>Гра з другом</p>}
      <Board />
      <button onClick={onRestart}>На головну</button>
    </div>
  );
}
