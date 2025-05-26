import react from 'react'

function Square({value, onSquareClick, disabled}) {
  let displayValue;
  if (value === 'V') {
    displayValue = '💎';
  } else if (value === 'X') {
    displayValue = '💣';
  } else {
    displayValue = value;
  }

  return <button className="square" onClick={onSquareClick}
  disabled = {!disabled}>
    {displayValue}
  </button>;
}

export default Square