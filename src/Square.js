import react from 'react'

function Square({value, onSquareClick, disabled}) {
  return <button className="square" onClick={onSquareClick}
  disabled = {!disabled}>
    {value}
  </button>;
}

export default Square