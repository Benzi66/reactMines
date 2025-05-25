import { useState } from "react";

var turns = 0;
function Square({value1}) {
  const [value , setValue] = useState(value1);
  function handleClick() {
    value === "X" ? setValue(null) :
      setValue("X");
      turns++;
      console.log(turns);
  }
  return <button className="square"
    onClick={handleClick}>
    {value}
  </button>;
}

export default function Board() {
  const v = "n";
  return (
    <>
      <div className="board-row">
        <Square value={v} />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
    </>
  );
}

