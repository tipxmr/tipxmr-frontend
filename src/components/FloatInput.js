import React from "react";

function FloatInput({
  labelName,
  name,
  placeholderName,
  register,
  errors,
  required = false,
}) {
  return (
    <div className="m-4 text-center flex flex-grow border-2 p-6 bg-xmrgray-darker text-white rounded">
      <div className="m-auto">
        <label className="m-3">
          {labelName}:<br />
          <input
            className="w-full min-w-400 border-2 p-1 text-center text-xmrorange border-xmrgray-lighter placeholder-xmrgray-lighter"
            name={name}
            placeholder={placeholderName}
            type="text"
            ref={register}
          ></input>
          {errors[name]}
        </label>
      </div>
    </div>
  );
}

export default FloatInput;
