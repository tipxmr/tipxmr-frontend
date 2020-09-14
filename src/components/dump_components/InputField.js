import React from "react";

function InputField({
  labelName,
  configKey,
  placeholderName,
  fieldType,
  stateSetter,
  baseState,
}) {
  function handleChange(e) {
    const value = e.target.value;
    stateSetter({
      ...baseState,
      [configKey]: value,
    });
    console.log(baseState.configKey);
  }

  return (
    <div className="m-4 w-1/4 text-center">
      <label className="mb-2">
        {labelName}:<br />
        <input
          name={configKey}
          placeholder={placeholderName}
          type={fieldType}
          onChange={handleChange}
          className="w-full border-2 p-1 text-center border-xmrgray-darker placeholder-xmrgray-lighter focus:placeholder-xmrorange-lighter"
        ></input>
      </label>
    </div>
  );
}

export default InputField;
