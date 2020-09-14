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
    <div className="m-4 text-center flex flex-grow border-2 p-6 bg-xmrgray-darker text-white rounded">
      <div className="mx-auto">
        <label className="m-3">
          {labelName}:<br />
          <input
            name={configKey}
            placeholder={placeholderName}
            type={fieldType}
            onChange={handleChange}
            className="w-full min-w-400 border-2 p-1 text-center border-xmrgray-lighter placeholder-xmrgray-lighter focus:placeholder-xmrorange-lighter"
          ></input>
        </label>
      </div>
    </div>
  );
}

export default InputField;
