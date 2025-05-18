type Props = {
  onStartGame: (mode: "vsAI" | "vsFriend") => void;
};

export function Home({ onStartGame }: Props) {
  return (
    <div>
      <h1>Хрестики-нулики</h1>
      <p>Оберіть, з ким хочете грати</p>
      <div>
        <button onClick={() => onStartGame("vsAI")}>Грати з AI</button>
        <button onClick={() => onStartGame("vsFriend")}>Грати з другом</button>
      </div>
    </div>
  );
}
