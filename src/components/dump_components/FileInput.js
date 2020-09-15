import React from "react";

// TODO Make sure that the file is actually saved (attached to the PouchDB)
function FileInput({ labelName, name, placeholderName, stateSetter }) {
  function handleChange(e) {
    stateSetter(e.target.name, e.target.value);
  }

  return (
    <div className="m-4 text-center flex flex-grow border-2 p-6 bg-xmrgray-darker text-white rounded">
      <div className="mx-auto">
        <label className="m-3">
          {labelName}:<br />
          <input
            name={name}
            placeholder={placeholderName}
            type="file"
            onChange={handleChange}
            className="w-full min-w-400 border-2 p-1 text-sm text-center text-xmrorange border-xmrgray-lighter placeholder-xmrgray-lighter"
          ></input>
        </label>
      </div>
    </div>
  );
}

export default FileInput;
