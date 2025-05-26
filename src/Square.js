import React from 'react';
import diamondImg from './Images/testDiamondPNG.png';
import mineImg from './Images/testMinePNG.png';

function Square({ value, onSquareClick, disabled }) {
  let displayContent;
  let dynamicClassName = 'square';
  displayContent = value;

    // if (value === 'V') {
    //   displayContent = <img src={diamondImg} alt="Diamond"   style={{ width: '80%', height: '80%', marginTop: '15%' }} />;
    //   dynamicClassName += ' square-revealed-safe';
    // } else if (value === 'X') {
    //   displayContent = <img src={mineImg} alt="Mine" style={{ width: '80%', height: '80%', marginTop: '15%' }} />;
    //   dynamicClassName += ' square-revealed-mine';
    // } 
    // else if (value === 'VE') {
    //   displayContent = <img src={diamondImg} alt="Diamond"   style={{ width: '50%', height: '50%', marginTop: '15%' , opacity: '70%' }} />;
    //   dynamicClassName += ' square-revealed-safe';
    // } else if (value === 'XE') {
    //   displayContent = <img src={mineImg} alt="Mine" style={{ width: '50%', height: '50%', marginTop: '15%', opacity: '70%' }} />;
    //   dynamicClassName += ' square-revealed-mine';
    // } 
    switch (value) {
      case 'V':
      displayContent = <img src={diamondImg} alt="Diamond"   style={{ width: '80%', height: '80%', marginTop: '15%' }} />;
      break;
      case 'X':
      displayContent = <img src={mineImg} alt="Mine" style={{ width: '80%', height: '80%', marginTop: '15%' }} />;
      break;
      case 'VE':
      displayContent = <img src={diamondImg} alt="Diamond"   style={{ width: '50%', height: '50%', marginTop: '15%' , opacity: '70%' }} />;
      break;
      case 'XE':
      displayContent = <img src={mineImg} alt="Mine" style={{ width: '50%', height: '50%', marginTop: '15%', opacity: '70%' }} />;
      break;
      default:
      break;
    }




  // The 'disabled' prop in Square.js is true if it *should* be clickable.
  // So if it's NOT disabled (meaning, it's truly disabled from user interaction as per the parent)
  // The prop from GameBoard.js is gameStarted={!gameStarted}, which becomes 'disabled' in Square.js
  // So, if disabled is false (meaning it should be disabled), add the class.
  if (!disabled) {
    dynamicClassName += ' square-disabled';
  }

  let iconClassName = 'square-icon';
  if (value === 'V' || value === 'X' || value === 'VE' || value === 'XE') {
    iconClassName += ' square-icon-animate';
  }


  return (
    <button className={dynamicClassName} onClick={onSquareClick} disabled={!disabled}>
      {(value === 'V' || value === 'X' || value === 'VE' || value === 'XE') ? (
        <div className={iconClassName}>
          {displayContent}
        </div>
      ) : null}
    </button>
  );
}

export default Square;