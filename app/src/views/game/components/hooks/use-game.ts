import { useEffect, useState } from "react";

type SquareValue = string | null;
type BoardState = SquareValue[];
type HistoryState = BoardState[];

export function useGame(gameMode: "vsAI" | "vsFriend") {
  const [history, setHistory] = useState<HistoryState>([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState<number>(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  const winnerInfo = calculateWinner(currentSquares);
  const draw = isDraw(currentSquares);
  const winner = winnerInfo?.winner ?? null;

  useEffect(() => {
    if (gameMode !== "vsAI" || xIsNext || winner || draw) return;

    const timeout = setTimeout(() => {
      const bestMove = findBestMove(currentSquares);
      if (bestMove !== -1) {
        const nextSquares = currentSquares.slice();
        nextSquares[bestMove] = "O";
        handlePlay(nextSquares);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [xIsNext, gameMode, currentSquares, winner, draw]);

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

  function findBestMove(squares: BoardState): number {
    let bestScore = -Infinity;
    let move = -1;
    for (let i = 0; i < squares.length; i++) {
      if (!squares[i]) {
        squares[i] = "O";
        const score = minimax(squares, 0, false, -Infinity, Infinity);
        squares[i] = null;
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }
    return move;
  }

  function minimax(
    squares: BoardState,
    depth: number,
    isMaximizing: boolean,
    alpha: number,
    beta: number
  ): number {
    const result = calculateWinner(squares);
    if (result?.winner === "O") return 10 - depth;
    if (result?.winner === "X") return depth - 10;
    if (isDraw(squares)) return 0;

    if (isMaximizing) {
      let maxEval = -Infinity;
      for (let i = 0; i < squares.length; i++) {
        if (!squares[i]) {
          squares[i] = "O";
          const evalScore = minimax(squares, depth + 1, false, alpha, beta);
          squares[i] = null;
          maxEval = Math.max(maxEval, evalScore);
          alpha = Math.max(alpha, evalScore);
          if (beta <= alpha) break;
        }
      }
      return maxEval;
    } else {
      let minEval = Infinity;
      for (let i = 0; i < squares.length; i++) {
        if (!squares[i]) {
          squares[i] = "X";
          const evalScore = minimax(squares, depth + 1, true, alpha, beta);
          squares[i] = null;
          minEval = Math.min(minEval, evalScore);
          beta = Math.min(beta, evalScore);
          if (beta <= alpha) break;
        }
      }
      return minEval;
    }
  }

  return {
    models: {
      xIsNext,
      currentSquares,
      winner,
      winningLine: winnerInfo?.line ?? [],
      isDraw: draw,
    },
    operations: {
      handlePlay,
    },
  };
}
