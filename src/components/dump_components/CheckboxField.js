import React from "react";

function CheckboxField({
  labelName,
  configKey,
  defaultChecked,
  stateSetter,
  baseState,
}) {
  return (
    <div className="m-4 text-center flex flex-grow border-2 p-6 bg-xmrgray-darker text-white rounded">
      <div className="mx-auto">
        <label className="m-3">
          {labelName}:<br />
          <input
            name={configKey}
            type="checkbox"
            checked={defaultChecked}
            className="mx-auto border-2 mt-3 w-8 h-8 rounded"
          ></input>
        </label>
      </div>
    </div>
  );
}

export default CheckboxField;
