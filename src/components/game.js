import { useState } from "react";
import Board from "./board";


function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquare = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(move) {
    setCurrentMove(move);
  }

  function undo(){
    if (currentMove === 0) {
      return;
    }
    setCurrentMove(currentMove - 1);
  }

  function redo(){
    if (currentMove + 1 === history.length) {
      return;
    }
    setCurrentMove(currentMove + 1);
  }

  function reset(){
    setCurrentMove(0);
    setHistory([Array(9).fill(null)]);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = `Go to move #${move}`;
    } else {
      description = `Go to the first move`;
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquare} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
      <div className="undo-redo-reset">
        <button className="undo" onClick={() => undo()}>
          Undo
        </button>
        <button className="redo" onClick={() => redo()}>
          Redo
        </button>
        <button className="reset" onClick={() => reset()}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default Game;
