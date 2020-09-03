import React from "react";

function Syncbutton(props) {
  let element;
  if (props.synced === true) {
    element = (
      <div className="rounded p-3 bg-green-500 w-full">You are up to date</div>
    );
  } else {
    element = (
      <div className="rounded p-3 bg-red-500 w-full">
        Your wallet still needs to catch up
      </div>
    );
  }

  return element;
}

export default Syncbutton;
