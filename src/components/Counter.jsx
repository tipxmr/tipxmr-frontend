import React, { useState } from "react";

function Counter({ count, setCount }) {
  // const [count, setCount] = useState(1);
  function decrementCount() {
    setCount((prevCount) => prevCount - 1);
  }
  function incrementCount() {
    setCount((prevCount) => prevCount + 1);
  }

  return (
    <div className="w-24">
      <div className="bg-green-500 flex flex-row rounded text-xl text-white justify-center text-center">
        <div className="flex-1" onClick={decrementCount}>
          -
        </div>
        <div className="flex-2">{count}</div>
        <div className="flex-1" onClick={incrementCount}>
          +
        </div>
      </div>
    </div>
  );
}

export default Counter;
