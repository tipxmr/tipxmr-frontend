import React, { useState } from "react";
import PropTypes from "prop-types";

function DropdownField({ options, labelText, stateSetter, selected }) {
  const menuItems = options.map((option) => {
    return (
      <option key={option} value={option}>
        {option}
      </option>
    );
  });

  function handleChange(e) {
    stateSetter(e.target.value);
  }
  return (
    <div className="m-4 text-center flex flex-grow border-2 p-6 bg-xmrgray-darker text-white rounded">
      <div className="m-auto">
        <label className="m-3">{labelText}</label>
        <select
          id={options}
          name={options}
          value={selected}
          onChange={handleChange}
          className="p-2 block appearance-none w-full bg-gray-200 border border-orange-400 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        >
          {menuItems}
        </select>
      </div>
    </div>
  );
}

DropdownField.propTypes = {
  options: PropTypes.array,
  labelText: PropTypes.string,
  stateSetter: PropTypes.func,
  selected: PropTypes.string,
};

export default DropdownField;
