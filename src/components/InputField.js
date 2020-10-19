import React from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";

function InputField({
  labelName,
  name,
  placeholderName,
  stateSetter,
  register,
  errors,
  required = false,
}) {
  // function handleChange(e) {
  //   stateSetter(e.target.value);
  // }

  return (
    <div className="m-4 text-center flex flex-grow border-2 p-6 bg-xmrgray-darker text-white rounded">
      <div className="m-auto">
        <label className="m-3">
          {labelName}:<br />
          <input
            name={name}
            placeholder={placeholderName}
            type="text"
            /* onChange={handleChange} */
            ref={register}
            className="w-full min-w-400 border-2 p-1 text-center text-xmrorange border-xmrgray-lighter placeholder-xmrgray-lighter"
          ></input>
          {errors[name]}
        </label>
      </div>
    </div>
  );
}
InputField.propTypes = {
  labelName: PropTypes.string,
  name: PropTypes.string,
  placeholderName: PropTypes.string,
  stateSetter: PropTypes.func,
  // register: PropTypes.func,
  // errors: PropTypes.func,
};

export default InputField;
