import { useState } from "react";
import PropTypes from "prop-types";

const DropdownField = ({
  name,
  options,
  labelText,
  selected,
  register,
  errors,
}) => {
  const [selectedItem, setSelectedItem] = useState(selected);
  const menuItems = options.map((option) => {
    return (
      <option key={option} value={option}>
        {option}
      </option>
    );
  });

  const handleChange = (e) => {
    setSelectedItem(e.target.value);
  }

  return (
    <div className="m-4 text-center flex flex-grow border-2 p-6 bg-xmrgray-darker text-white rounded">
      <div className="m-auto">
        <label className="m-3">{labelText}</label>
        <select
          id={options}
          name={name}
          value={selectedItem}
          onChange={handleChange}
          className="p-2 block appearance-none w-full bg-gray-200 border border-orange-400 text-xmrgray-darker py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          ref={register}
        >
          {menuItems}
        </select>
        <p className="text-xmrorange mt-2">
          {errors[name] ? errors[name].message : null}
        </p>
      </div>
    </div>
  );
}

// TODO add propTypes for register, errors, required
DropdownField.propTypes = {
  options: PropTypes.array,
  labelText: PropTypes.string,
  stateSetter: PropTypes.func,
  selected: PropTypes.string,
};

export default DropdownField;
