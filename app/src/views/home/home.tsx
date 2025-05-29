type Props = {
  onStartGame: (mode: "vsFriend" | "vsWeakAI" | "vsStrongAI") => void;
};

export function Home({ onStartGame }: Props) {
  return (
    <div>
      <h1>Хрестики-нулики</h1>
      <p>Оберіть, з ким хочете грати</p>
      <div>
        <button onClick={() => onStartGame("vsFriend")}>Грати з другом</button>
        <button onClick={() => onStartGame("vsWeakAI")}>
          Грати зі слабким ШІ
        </button>
        <button onClick={() => onStartGame("vsStrongAI")}>
          Грати з сильним ШІ
        </button>
      </div>
    </div>
  );
}
