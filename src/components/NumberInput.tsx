import React, { useState } from "react";

function NumberInput({
  labelName,
  name,
  placeholderName,
  numType = "float",
  register,
  errors,
}) {
  const [number, setNumber] = useState(placeholderName);
  function handleChange(e) {
    if (numType === "float") {
      setNumber(parseFloat(e.target.value));
    } else if (numType === "integer") {
      setNumber(parseInt(e.target.value));
    }
  }
  return (
    <div className="m-4 text-center flex flex-grow border-2 p-6 bg-xmrgray-darker text-white rounded">
      <div className="m-auto">
        <label className="m-3">
          {labelName}:<br />
          <input
            className="w-full min-w-400 border-2 p-1 text-center text-xmrgray-darker border-xmrgray-lighter"
            name={name}
            value={number}
            onChange={handleChange}
            type="number"
            ref={register}
          ></input>
        </label>
        <p className="text-xmrorange mt-2">
          {errors[name] ? errors[name].message : null}
        </p>
      </div>
    </div>
  );
}

export default NumberInput;
