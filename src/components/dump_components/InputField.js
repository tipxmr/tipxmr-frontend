import React from "react";

function InputField({ labelName, configKey, placeholderName, fieldType }) {
  function handleChange(e) {
    // TODO: handle the change in field
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
