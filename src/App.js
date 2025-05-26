import { useState } from "react";
import NumberInput from "./NumberInput.tsx";
import GameBoard from "./GameBoard.js";
import Square from "./Square.js";

export default function MineField() {
  const [gameStarted, setGameStarted] = useState(false);
  const [squares, setSquares] = useState(Array(25).fill(null));
  const [mines, setMines] = useState(Array(25).fill("V"));
  const [minesAmt, setAmt] = useState(1);
  const [mult, setMult] = useState(1);
  const [currCash,setCurrCash] = useState(0);
  const [TotalCash, setTotalCash] = useState(300);

  function CashOut() {
    setGameStarted(false);
    setCurrCash(currCash * mult);
    setTotalCash(TotalCash + currCash);
    setCurrCash(0);
  }
  function StartButton() {
    setSquares(Array(25).fill(null));
    PlaceMines({Amount: minesAmt});
    setGameStarted(true);
    setMult(1);
    setTotalCash(TotalCash-currCash);
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
        setCurrCash(0);
        setMult(1);
        for (let t = 0; t < 25; t++) {
          nextSquares[t] = mines[t]
        }

      }
      else{
        setMult(parseFloat((mult*(Math.pow(1.05,minesAmt))).toFixed(2)));
      }

    }
    setSquares(nextSquares);
  }

  return (
    <>
      
      <button onClick={StartButton} disabled = {gameStarted}>Start</button>
      <button onClick={CashOut} disabled = {!gameStarted}>Cash Out</button>
      <h4>Multiplier: {mult}</h4>
      <h4>TotalCash: {TotalCash}</h4>
      <h4>Cash Out Money: {parseFloat((mult * currCash).toFixed(2))}</h4>
      <NumberInput label={"Amount of mines"} value = {minesAmt} onChange={setAmt} disabled = {gameStarted} />
      <NumberInput label={"Cash for game"} value = {currCash} onChange={setCurrCash} disabled = {gameStarted} />
      <GameBoard squares={squares} onClick={handleClick} boardSize={5} gameStarted={!gameStarted}/>
    </>
  );
}


