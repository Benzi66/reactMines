import React from 'react';

function CashOutPopup({ multiplier, amountWon, isVisible }) {
  if (!isVisible) {
    return null;
  }

  // When isVisible is true, App.js renders this component.
  // We add 'visible' class to trigger the entry animation.
  // The exit animation won't play with current App.js logic as the component
  // will be removed from DOM immediately when isVisible becomes false.
  return (
    <div className="cashout-popup visible">
      <div className="popup-multiplier">{multiplier ? multiplier.toFixed(2) : '0.00'}x M</div>
      <div className="popup-amount-won">
        You won: {amountWon ? amountWon.toFixed(2) : '0.00'} cash
      </div>
    </div>
  );
}

export default CashOutPopup;
