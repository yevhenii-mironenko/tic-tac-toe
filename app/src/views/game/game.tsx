type Props = {
  gameMode: "vsAI" | "vsFriend";
  onRestart: () => void;
};

export function Game({ gameMode, onRestart }: Props) {
  return (
    <div>
      <h1>Гра</h1>
      {gameMode === "vsAI" ? <p>Гра з AI</p> : <p>Гра з другом</p>}
      <button onClick={onRestart}>На головну</button>
    </div>
  );
}
