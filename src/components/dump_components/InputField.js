import React from "react";

function InputField({ labelName, fieldName, placeholderName, fieldType }) {
  function handleChange(e) {
    // TODO: handle the change in field
  }

  return (
    <div>
      <label>
        {labelName}:
        <input
          placeholder={placeholderName}
          name={fieldName}
          type={fieldType}
          onChange={handleChange}
        ></input>
      </label>
    </div>
  );
}

export default InputField;
