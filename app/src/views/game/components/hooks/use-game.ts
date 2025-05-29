import { useState } from "react";

type SquareValue = string | null;
type BoardState = SquareValue[];
type HistoryState = BoardState[];

export function useGame() {
  const [history, setHistory] = useState<HistoryState>([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState<number>(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares: BoardState) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function calculateWinner(
    squares: BoardState
  ): { winner: string; line: number[] } | null {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return { winner: squares[a], line: [a, b, c] };
      }
    }
    return null;
  }

  function isDraw(squares: BoardState): boolean {
    return squares.every(Boolean) && !calculateWinner(squares);
  }

  const winnerInfo = calculateWinner(currentSquares);
  const draw = isDraw(currentSquares);

  return {
    models: {
      xIsNext,
      currentSquares,
      winner: winnerInfo?.winner ?? null,
      winningLine: winnerInfo?.line ?? [],
      isDraw: draw,
    },
    operations: {
      handlePlay,
      calculateWinner,
    },
  };
}
