import { useState } from "react";
import NumberInput from "./NumberInput.tsx";
import GameBoard from "./GameBoard.js";
import Square from "./Square.js";

export default function MineField() {
  const [gameStarted, setGameStarted] = useState(false);
  const [squares, setSquares] = useState(Array(25).fill(null));
  const [mines, setMines] = useState(Array(25).fill("V"));
  const [minesAmt, setAmt] = useState(1);
  function StartButton() {
    setSquares(Array(25).fill(null));
    PlaceMines({Amount: minesAmt});
    setGameStarted(true);
  }
  function PlaceMines({ Amount }) {
    const nextMines = Array(25).fill("V");
    if (Amount > 1) {
      const arr = [];
      let minePlacement = Math.floor(Math.random() * 25);
      nextMines[minePlacement] = "X";
      console.log(minePlacement);
      for (let i = 1; i < Amount; i++) {
        arr.push(minePlacement);
        while (arr.includes(minePlacement)) {
          minePlacement = Math.floor(Math.random() * 25);
        }
        console.log(minePlacement);
        nextMines[minePlacement] = "X";
      }
    }
    else {
      let minePlacement = Math.floor(Math.random() * 25);
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
        setGameStarted(false);
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
      <GameBoard squares={squares} onClick={handleClick} boardSize={5} gameStarted={!gameStarted}/>
    </>
  );
}


