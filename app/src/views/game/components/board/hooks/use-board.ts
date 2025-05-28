type BoartType = (string | null)[];

type Props = {
  xIsNext: boolean;
  squares: BoartType;
  onPlay: (squares: BoartType) => void;
  onCalculateWinner: (squares: BoartType) => string | null;
};

export function useBoard({
  xIsNext,
  squares,
  onPlay,
  onCalculateWinner,
}: Props) {
  function handleClick(i: number) {
    if (onCalculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  const winner = onCalculateWinner(squares);

  let status;
  if (winner) {
    status = "Переможець: " + winner;
  } else {
    status = "Наступний гравець: " + (xIsNext ? "X" : "O");
  }

  return {
    models: {
      status,
    },
    operations: {
      handleClick,
    },
  };
}
