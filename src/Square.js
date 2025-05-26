import react from 'react'

function Square({value, onSquareClick, disabled}) {
  let displayValue;
  let dynamicClassName = 'square';

  if (value === 'V') {
    displayValue = '💎';
    dynamicClassName += ' square-revealed-safe';
  } else if (value === 'X') {
    displayValue = '💣';
    dynamicClassName += ' square-revealed-mine';
  } else {
    displayValue = value; // Should be null or empty for unrevealed squares
  }

  // The 'disabled' prop in Square.js is true if it *should* be clickable.
  // So if it's NOT disabled (meaning, it's truly disabled from user interaction as per the parent)
  // The prop from GameBoard.js is gameStarted={!gameStarted}, which becomes 'disabled' in Square.js
  // So, if disabled is false (meaning it should be disabled), add the class.
  if (!disabled) {
    dynamicClassName += ' square-disabled';
  }

  let iconClassName = 'square-icon';
  if (value === 'V' || value === 'X') {
    iconClassName += ' square-icon-animate';
  }

  return (
    <button className={dynamicClassName} onClick={onSquareClick} disabled={!disabled}>
      {(value === 'V' || value === 'X') && (
        <span className={iconClassName}>
          {displayValue}
        </span>
      )}
    </button>
  );
}

export default Square