import { getPayout } from "./payoutTable.js";
import { useState } from "react";
import NumberInput from "./NumberInput.tsx";
import GameBoard from "./GameBoard.js";
import CashOutPopup from './CashOutPopup.js';;


export default function MineField() {
  const [gameStarted, setGameStarted] = useState(false);
  const [squares, setSquares] = useState(Array(25).fill(null));
  const [mines, setMines] = useState(Array(25).fill("V"));
  const [minesAmt, setAmt] = useState(1);
  const [mult, setMult] = useState(1);
  const [TotalCash, setTotalCash] = useState(300.0);
  const [showCashOutPopup, setShowCashOutPopup] = useState(false);
  const [popupData, setPopupData] = useState({ multiplier: 0, amountWon: 0 });;
  const [wantedBet, setWantedBet] = useState(10);
  const [successAmt, setSuccessAmt] = useState(0);


  function CashOut() {
    const amountJustWon = wantedBet * mult; // Calculate amount won in this round
    setTotalCash(parseFloat((TotalCash + (wantedBet * mult)).toFixed(2))); // Add winnings to total cash
    setPopupData({ multiplier: mult, amountWon: amountJustWon });
    setShowCashOutPopup(true);
    setGameStarted(false);
    revealAll();
  }
  function StartButton() {
    setSquares(Array(25).fill(null));
    PlaceMines({ Amount: minesAmt });
    setGameStarted(true);
    setMult(1);
    setTotalCash(parseFloat((TotalCash - wantedBet).toFixed(2)));
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
      setSquares(nextSquares);
      if (nextSquares[i] === "X") {
        setGameStarted(false);
        setMult(1);
        revealAll();

      }
      else {
        setSuccessAmt(successAmt + 1);
        setMult(getPayout(successAmt + 1, minesAmt));
        setSquares(nextSquares);
      }

    }
  }

  function revealAll() {
    const nextSquares = squares.slice();
        for (let t = 0; t < 25; t++) {
          if(nextSquares[t] === null)
          if(mines[t] === "V")
          nextSquares[t] = "VE";
          else
          if(mines[t] === "X")
          nextSquares[t] = "XE";   
      setSquares(nextSquares);
    }
  }

  return (
    <div className="game-container">
      <div className="game-info">
        <div className="game-board"
          onClick={(event) => {
            if (showCashOutPopup) {
              const popupElement = document.querySelector('.cashout-popup.visible');
              if (popupElement && popupElement.contains(event.target)) {
                return;
              }
              setShowCashOutPopup(false);
            }
          }}
        >
          <GameBoard
            squares={squares} onClick={handleClick} boardSize={5} gameStarted={!gameStarted} />
          <CashOutPopup
            multiplier={popupData.multiplier}
            amountWon={popupData.amountWon}
            isVisible={showCashOutPopup}
          />
        </div>
        <div className="other-stuff">
          <div className="top-controls">
            <button className="btn-start" onClick={StartButton} disabled={gameStarted}>Start</button>
            <button className="btn-cashout" onClick={CashOut} disabled={!gameStarted}>Cash Out</button>
          </div>
          <div className="input-settings-panel">
            <NumberInput label={"Amount of mines "} value={minesAmt} onChange={setAmt} disabled={gameStarted} min={1} max={24} />
            <NumberInput label={"Cash for game "} value={wantedBet} onChange={setWantedBet} disabled={gameStarted} min={1} max={TotalCash} />
          </div>
          <div className="game-stats">
            <h4 className="multiplier-text">Multiplier: {mult}</h4>
            <h4 className="cash-text">TotalCash: {TotalCash}</h4>
            <h4 className="cash-text">Cash Out Money: {parseFloat((mult * wantedBet).toFixed(2))}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}


