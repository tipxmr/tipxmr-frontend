import React, { useState } from "react";
import PropTypes from "prop-types";

// TODO Make sure that the file is actually saved (attached to the PouchDB)
function FileInput({
  labelName,
  name,
  currentFile,
  accept,
  maxFilesize,
  register,
  errors,
}) {
  const [upload, setUpload] = useState(currentFile);

  function handleChange(e) {
    const file = e.target.files[0];
    if (file.size < maxFilesize) {
      console.log("new File: ", file);
      let objectURL = URL.createObjectURL(file);
      setUpload(objectURL);
    }
  }

  return (
    <div className="m-4 text-center flex flex-grow border-2 p-6 bg-xmrgray-darker text-white rounded">
      <div className="m-auto">
        <label className="m-3">
          {labelName}:<br />
          <input
            name={name}
            placeholder={currentFile}
            type="file"
            accept={accept}
            onChange={handleChange}
            className="w-full min-w-400 border-2 p-1 text-sm text-center text-xmrorange border-xmrgray-lighter placeholder-xmrgray-lighter"
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

// TODO Update propTypes
FileInput.propTypes = {
  labelName: PropTypes.string,
  name: PropTypes.string,
  currentFile: PropTypes.string,
  accept: PropTypes.string,
  maxFilesize: PropTypes.number,
};
export default FileInput;
