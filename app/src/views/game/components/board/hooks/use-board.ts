type SquareValue = "X" | "O" | null;
type BoardType = SquareValue[];

type Props = {
  xIsNext: boolean;
  squares: BoardType;
  onPlay: (nextSquares: BoardType) => void;
  winner: string | null;
  isDraw: boolean;
  gameMode: "vsFriend" | "vsWeakAI" | "vsStrongAI";
};

export function useBoard({
  xIsNext,
  squares,
  onPlay,
  winner,
  isDraw,
  gameMode,
}: Props) {
  function handleClick(i: number) {
    const isAIturn =
      !xIsNext && (gameMode === "vsWeakAI" || gameMode === "vsStrongAI");
    if (squares[i] || winner || isAIturn) return;

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  }

  const status = winner
    ? `Переможець: ${winner}`
    : isDraw
    ? "Нічия!"
    : `Наступний хід: ${xIsNext ? "X" : "O"}`;

  return {
    models: {
      status,
    },
    operations: {
      handleClick,
    },
  };
}
