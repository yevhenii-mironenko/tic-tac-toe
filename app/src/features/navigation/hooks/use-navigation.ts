import { useState } from "react";

type Step = "home" | "game" | "results";
type GameMode = "vsAI" | "vsFriend" | null;

export function useNavigation() {
  const [step, setStep] = useState<Step>("home");
  const [gameMode, setGameMode] = useState<GameMode>(null);

  const handleStartGame = (mode: Exclude<GameMode, null>) => {
    setGameMode(mode);
    setStep("game");
  };

  const goToResults = () => {
    setStep("results");
  };

  const handleRestart = () => {
    setGameMode(null);
    setStep("home");
  };

  return {
    models: {
      step,
      gameMode,
    },
    operations: {
      goToResults,
      handleStartGame,
      handleRestart,
    },
  };
}
