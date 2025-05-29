import { useEffect, useState } from "react";

type SquareValue = "X" | "O" | null;
type BoardState = SquareValue[];
type HistoryState = BoardState[];
type GameMode = "vsFriend" | "vsWeakAI" | "vsStrongAI";

export function useGame(gameMode: GameMode) {
  const [history, setHistory] = useState<HistoryState>([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState<number>(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  const winnerInfo = calculateWinner(currentSquares);
  const draw = isDraw(currentSquares);

  function handlePlay(nextSquares: BoardState) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function handleRestartGame() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  }

  useEffect(() => {
    if (
      (gameMode === "vsWeakAI" || gameMode === "vsStrongAI") &&
      !winnerInfo &&
      !draw &&
      !xIsNext
    ) {
      const makeMove = () => {
        const next = currentSquares.slice();
        const bestMove =
          gameMode === "vsStrongAI"
            ? findBestMove(currentSquares)
            : getWeakAIMove(currentSquares);

        if (bestMove !== null) {
          next[bestMove] = "O";
          handlePlay(next);
        }
      };

      const timeout = setTimeout(makeMove, 500);
      return () => clearTimeout(timeout);
    }
  }, [currentSquares, xIsNext, winnerInfo, draw, gameMode]);

  function calculateWinner(squares: BoardState) {
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
    for (const [a, b, c] of lines) {
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

  function getWeakAIMove(squares: BoardState): number | null {
    const emptyIndexes = squares
      .map((val, idx) => (val === null ? idx : null))
      .filter((v): v is number => v !== null);

    for (const idx of emptyIndexes) {
      squares[idx] = "O";
      if (calculateWinner(squares)?.winner === "O") {
        squares[idx] = null;
        return idx;
      }
      squares[idx] = null;
    }

    for (const idx of emptyIndexes) {
      squares[idx] = "X";
      if (calculateWinner(squares)?.winner === "X") {
        squares[idx] = null;
        return idx;
      }
      squares[idx] = null;
    }

    if (emptyIndexes.length === 0) return null;
    return emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
  }

  function findBestMove(squares: BoardState): number | null {
    let bestScore = -Infinity;
    let move: number | null = null;

    for (let i = 0; i < squares.length; i++) {
      if (squares[i] === null) {
        squares[i] = "O";
        const score = minimax(squares, 0, false);
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
    board: BoardState,
    depth: number,
    isMaximizing: boolean
  ): number {
    const result = calculateWinner(board);
    if (result?.winner === "O") return 10 - depth;
    if (result?.winner === "X") return depth - 10;
    if (isDraw(board)) return 0;

    if (isMaximizing) {
      let maxEval = -Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          board[i] = "O";
          const evalScore = minimax(board, depth + 1, false);
          board[i] = null;
          maxEval = Math.max(maxEval, evalScore);
        }
      }
      return maxEval;
    } else {
      let minEval = Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          board[i] = "X";
          const evalScore = minimax(board, depth + 1, true);
          board[i] = null;
          minEval = Math.min(minEval, evalScore);
        }
      }
      return minEval;
    }
  }
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
      handleRestartGame,
    },
  };
}
