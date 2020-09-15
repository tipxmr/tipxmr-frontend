import React from "react";

function FloatInput({ labelName, name, placeholderName, stateSetter }) {
  function handleChange(e) {
    stateSetter(e.target.name, parseFloat(e.target.value));
  }

  return (
    <div className="m-4 text-center flex flex-grow border-2 p-6 bg-xmrgray-darker text-white rounded">
      <div className="mx-auto">
        <label className="m-3">
          {labelName}:<br />
          <input
            name={name}
            placeholder={placeholderName}
            type="text"
            onChange={handleChange}
            className="w-full min-w-400 border-2 p-1 text-center text-xmrorange border-xmrgray-lighter placeholder-xmrgray-lighter"
          ></input>
        </label>
      </div>
    </div>
  );
}

export default FloatInput;
