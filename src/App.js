import { getPayout } from "./payoutTable.js";
import { useState } from "react";
import NumberInput from "./NumberInput.tsx";
import GameBoard from "./GameBoard.js";
import Square from "./Square.js";
import CashOutPopup from './CashOutPopup.js';;


export default function MineField() {
  const [gameStarted, setGameStarted] = useState(false);
  const [squares, setSquares] = useState(Array(25).fill(null));
  const [mines, setMines] = useState(Array(25).fill("V"));
  const [minesAmt, setAmt] = useState(1);
  const [mult, setMult] = useState(1);
  const [currCash,setCurrCash] = useState(0);
  const [TotalCash, setTotalCash] = useState(300.0);
  const [showCashOutPopup, setShowCashOutPopup] = useState(false);
  const [popupData, setPopupData] = useState({ multiplier: 0, amountWon: 0 });;
  const [wantedBet, setWantedBet] = useState(10);
  const [successAmt, setSuccessAmt] = useState(0);


  function CashOut() {
    const amountJustWon = currCash * mult; // Calculate amount won in this round
    // console.log(`CashOut: Multiplier: ${mult}, Amount Won: ${amountJustWon}, Current Bet: ${currCash}`);

    setTotalCash(prevTotalCash => prevTotalCash + amountJustWon); // Add winnings to total cash

    setPopupData({ multiplier: mult, amountWon: amountJustWon });
    setShowCashOutPopup(true);

    // Reset game state for next round AFTER showing popup data
    setGameStarted(false);
    setCurrCash(amountJustWon);
    setTotalCash(parseFloat(parseFloat(TotalCash) + parseFloat(currCash)));
    setCurrCash(0);
  }
  function StartButton() {
    setSquares(Array(25).fill(null));
    PlaceMines({Amount: minesAmt});
    setGameStarted(true);
    setMult(1);
    setCurrCash(wantedBet);
    setTotalCash(parseFloat(TotalCash-wantedBet));
    setSuccessAmt(0);
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
        setSuccessAmt(successAmt+1);
        setMult(getPayout(successAmt + 1, minesAmt));
      }

    }
    setSquares(nextSquares);
  }

  return (
    <>
      <div className="game-controls">
        <button className="btn-start" onClick={StartButton} disabled = {gameStarted}>Start</button>
        <button className="btn-cashout" onClick={CashOut} disabled = {!gameStarted}>Cash Out</button>
        <NumberInput label={"Amount of mines"} value = {minesAmt} onChange={setAmt} disabled = {gameStarted} />
        <NumberInput label={"Cash for game"} value = {wantedBet} onChange={setWantedBet} disabled = {gameStarted} />
      </div>
      <div className="game-info">
        <h4 className="multiplier-text">Multiplier: {mult}</h4>
        <h4 className="cash-text">TotalCash: {TotalCash}</h4>
        <h4 className="cash-text">Cash Out Money: {parseFloat((mult * currCash).toFixed(2))}</h4>
      </div>
      <div className="game-board">
        <GameBoard squares={squares} onClick={handleClick} boardSize={5} gameStarted={!gameStarted}/>
      </div>
      <CashOutPopup
        multiplier={popupData.multiplier}
        amountWon={popupData.amountWon}
        isVisible={showCashOutPopup}
      />
    </>
  );
}


