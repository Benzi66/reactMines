// GameBoard.js
import React from 'react';
import Square from './Square.js'; // Make sure you import Square

// This component is responsible for rendering the grid of squares
function GameBoard({ squares, onClick, gameStarted, boardSize }) { // Receive gameStarted here
  const totalTiles = boardSize * boardSize; // e.g., 25 for 5x5
  const rows = []; // This array will hold your <div> elements for each row

  // Loop to create rows
  for (let r = 0; r < boardSize; r++) {
    const rowSquares = []; // This array will hold the <Square> components for the current row
    // Loop to create squares within each row
    for (let c = 0; c < boardSize; c++) {
      const i = r * boardSize + c; // Calculate the overall index (0-24)

      rowSquares.push(
        <Square
          key={i} // IMPORTANT: Add a unique 'key' prop for lists in React
          value={squares[i]}
          onSquareClick={() => onClick(i)}
          gameStarted={gameStarted} // <--- Pass gameStarted down to Square
          // You might also want to disable if the square is already revealed:
          disabled={!gameStarted || squares[i] !== null} // Disabled if game not started OR square already clicked
        />
      );
    }
    rows.push(<div key={`row-${r}`} className="board-row">{rowSquares}</div>); // Create a div for each row
  }

  return (
    <div className="game-board">
      {rows} {/* Render all the generated row divs */}
    </div>
  );
}

export default GameBoard;