import { useState } from "react";
import NumberInput from "./NumberInput.tsx";

function Square({ value, onSquareClick }) {
  return <button className="square" onClick={onSquareClick}
  disabled = {!gameStarted}>
    {value}
  </button>;
}

function gameBoard({squares, onClick, boardSize, gameStarted}) {
  return 
  
}
export default function MineField() {
  const [gameStarted, setGameStarted] = useState(false);
  const [squares, setSquares] = useState(Array(25).fill(null));
  const [mines, setMines] = useState(Array(25).fill("V"));
  const [minesAmt, setAmt] = useState(1);

  function StartButton() {
    setSquares(Array(25).fill(null));
    PlaceMines(minesAmt);
    gameStarted = true;
  }
  function PlaceMines({ Amount }) {
    const nextMines = Array(25).fill("V");
    if (Amount > 1) {
      var minePlacement = Math.floor(Math.random() * 25);
      nextMines[minePlacement] = "X";
      console.log(minePlacement);
      for (let i = 1; i < Amount; i++) {
        var lastMinePlacement = minePlacement;
        while (minePlacement === lastMinePlacement) {
          minePlacement = Math.floor(Math.random() * 25);
        }
        console.log(minePlacement);
        nextMines[minePlacement] = "X";
        lastMinePlacement = minePlacement;
      }
    }
    else {
      var minePlacement = Math.floor(Math.random() * 25);
      nextMines[minePlacement] = "X";
      console.log(minePlacement);
    }
    setMines(nextMines);
  }

  function handleClick(i) {
    const nextSquares = squares.slice();
    if (nextSquares[i] === null) {
      nextSquares[i] = mines[i];
      if (nextSquares[i] === "X") {
        gameStarted = false;
        for (let t = 0; t < 25; t++) {
          nextSquares[t] = mines[t]
        }

      }

    }
    setSquares(nextSquares);
  }

  return (
    <>

      <button onClick={StartButton} disabled = {gameStarted}>Start</button>
      <NumberInput label={"Amount of mines"} value = {minesAmt} onChange={setAmt} disabled = {gameStarted} />
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => { handleClick(0) }} />
        <Square value={squares[1]} onSquareClick={() => { handleClick(1) }} />
        <Square value={squares[2]} onSquareClick={() => { handleClick(2) }} />
        <Square value={squares[3]} onSquareClick={() => { handleClick(3) }} />
        <Square value={squares[4]} onSquareClick={() => { handleClick(4) }} />
      </div>
      <div className="board-row">
        <Square value={squares[5]} onSquareClick={() => { handleClick(5) }} />
        <Square value={squares[6]} onSquareClick={() => { handleClick(6) }} />
        <Square value={squares[7]} onSquareClick={() => { handleClick(7) }} />
        <Square value={squares[8]} onSquareClick={() => { handleClick(8) }} />
        <Square value={squares[9]} onSquareClick={() => { handleClick(9) }} />
      </div>
      <div className="board-row">
        <Square value={squares[10]} onSquareClick={() => { handleClick(10) }} />
        <Square value={squares[11]} onSquareClick={() => { handleClick(11) }} />
        <Square value={squares[12]} onSquareClick={() => { handleClick(12) }} />
        <Square value={squares[13]} onSquareClick={() => { handleClick(13) }} />
        <Square value={squares[14]} onSquareClick={() => { handleClick(14) }} />
      </div>
      <div className="board-row">
        <Square value={squares[15]} onSquareClick={() => { handleClick(15) }} />
        <Square value={squares[16]} onSquareClick={() => { handleClick(16) }} />
        <Square value={squares[17]} onSquareClick={() => { handleClick(17) }} />
        <Square value={squares[18]} onSquareClick={() => { handleClick(18) }} />
        <Square value={squares[19]} onSquareClick={() => { handleClick(19) }} />
      </div>
      <div className="board-row">
        <Square value={squares[20]} onSquareClick={() => { handleClick(20) }} />
        <Square value={squares[21]} onSquareClick={() => { handleClick(21) }} />
        <Square value={squares[22]} onSquareClick={() => { handleClick(22) }} />
        <Square value={squares[23]} onSquareClick={() => { handleClick(23) }} />
        <Square value={squares[24]} onSquareClick={() => { handleClick(24) }} />
      </div>
    </>
  );
}

