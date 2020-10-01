import React from "react";
import clsx from "clsx";

function Toggle({ isChecked, onClick, children }) {
  const toggleStyles = clsx(
    "absolute",
    "block",
    "w-6",
    "h-6",
    "rounded-full",
    "bg-white",
    "border-4",
    "appearance-none",
    "cursor-pointer",
    {
      "right-0": isChecked,
      "border-green-400": isChecked,
    }
  );
  const labelStyles = clsx(
    "block",
    "overflow-hidden",
    "h-6",
    "rounded-full",
    "bg-gray-300",
    "cursor-pointer",
    {
      "bg-green-400": isChecked,
    }
  );
  return (
    <div>
      <div className="relative block w-10 mx-auto align-middle select-none transition duration-200 ease-in">
        <input
          type="checkbox"
          name="toggle"
          id="toggle"
          className={toggleStyles}
          onClick={onClick}
        />
        <label htmlFor="toggle" className={labelStyles}></label>
      </div>
      <label htmlFor="toggle" className="text-xs text-gray-700 block">
        {children}
      </label>
    </div>
  );
}

export default Toggle;
