type BoardType = (string | null)[];

type Props = {
  xIsNext: boolean;
  squares: BoardType;
  onPlay: (squares: BoardType) => void;
  winner: string | null;
  isDraw: boolean;
};

export function useBoard({ xIsNext, squares, onPlay, winner, isDraw }: Props) {
  function handleClick(i: number) {
    if (squares[i] || winner) return;
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
