import React, { useState } from "react";

function CheckboxField({ labelName, name, defaultChecked }) {
  const [isChecked, setIsChecked] = useState(defaultChecked);

  function handleChange(e) {
    setIsChecked(e.target.checked);
  }

  return (
    <div className="m-4 text-center flex flex-grow border-2 p-6 bg-xmrgray-darker text-white rounded">
      <div className="m-auto">
        <label className="m-3">
          {labelName}:<br />
          <input
            name={name}
            type="checkbox"
            defaultChecked={defaultChecked}
            onChange={handleChange}
            className="mx-auto border-2 mt-3 w-8 h-8 rounded"
          ></input>
        </label>
      </div>
    </div>
  );
}

export default CheckboxField;
