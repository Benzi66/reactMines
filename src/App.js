import { useState } from "react";
  

var turns = 0;
function Square({value, onSquareClick}) {
  return <button className="square" onClick={onSquareClick}>
    {value}
  </button>;
}

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  function handleClick(i) {
    const nextSquares = squares.slice();
    if (nextSquares[i] === null){
      turns++;
    const value = turns % 2 === 0 ? "O" : "X";
    nextSquares[i] = value; 
    }
    
    setSquares(nextSquares);
  }
  return (
    <>
      <h1>{calculateWinner(squares)}</h1>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => {handleClick(0)}} />
        <Square value={squares[1]} onSquareClick={() => {handleClick(1)}}/>
        <Square value={squares[2]} onSquareClick={() => {handleClick(2)}}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => {handleClick(3)}}/>
        <Square value={squares[4]} onSquareClick={() => {handleClick(4)}}/>
        <Square value={squares[5]} onSquareClick={() => {handleClick(5)}}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => {handleClick(6)}}/>
        <Square value={squares[7]} onSquareClick={() => {handleClick(7)}}/>
        <Square value={squares[8]} onSquareClick={() => {handleClick(8)}}/>
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    if(squares[lines[i][0]] === squares[lines[i][1]] && squares[lines[i][1]] === squares[lines[i][2]] && squares[lines[i][0]] !== null)
      return squares[lines[i][0]] + " is the winner";
  }
  return null;
}
