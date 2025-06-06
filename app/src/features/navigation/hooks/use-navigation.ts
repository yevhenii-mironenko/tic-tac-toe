import { useState } from "react";

type Step = "home" | "game";
type GameMode = "vsFriend" | "vsWeakAI" | "vsStrongAI" | null;

export function useNavigation() {
  const [step, setStep] = useState<Step>("home");
  const [gameMode, setGameMode] = useState<GameMode>(null);

  const handleStartGame = (mode: Exclude<GameMode, null>) => {
    setGameMode(mode);
    setTimeout(() => {
      setStep("game");
    }, 150);
  };

  const handleGoHome = () => {
    setGameMode(null);
    setStep("home");
  };

  return {
    models: {
      step,
      gameMode,
    },
    operations: {
      handleStartGame,
      handleGoHome,
    },
  };
}
