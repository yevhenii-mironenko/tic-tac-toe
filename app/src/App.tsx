import "./App.css";
import { useNavigation } from "./features/navigation/hooks/use-navigation";
import { Game } from "./views/game/game";
import { Home } from "./views/home/home";

export function App() {
  const { models, operations } = useNavigation();

  switch (models.step) {
    case "home":
      return <Home onStartGame={operations.handleStartGame} />;
    case "game":
      return models.gameMode ? (
        <Game gameMode={models.gameMode} onRestart={operations.handleRestart} />
      ) : null;
    case "results":
      return <div>Results</div>;
    default:
      return <Home onStartGame={operations.handleStartGame} />;
  }
}
export default App;
