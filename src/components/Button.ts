import React from "react";
import PropTypes from "prop-types";
import { FaSpinner } from "react-icons/fa";
import clsx from "clsx";

function Button({
  children,
  // bgColor = "bg-xmrorange",
  buttonWidth = "w-auto",
  textSize = "text-md",
  onClick = () => {},
  disabled = false,
  loading = false,
  active = true,
}) {
  const styles = clsx([
    // bgColor,
    buttonWidth,
    textSize,
    // "mx-auto",
    "flex",
    "tracking-tight",
    "justify-center",
    "text-white",
    "rounded",
    "py-2",
    "px-4",
    "h-auto",
    "disabled:opacity-75",
    "disabled:cursor-not-allowed",
    "focus:outline-none",
    "transform",
    "hover:scale-110",
    "border-xmrorange",
    "border-4",
    {
      "bg-xmrorange": active,
      "text-xmrgray-darker": !active,
      "bg-gray-200": !active,
      "opacity-75": !active,
    },
  ]);

  return (
    <button disabled={disabled} className={styles} onClick={onClick}>
      {loading ? (
        <FaSpinner className="self-center inline mr-2 animate-spin" />
      ) : null}
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  bgColor: PropTypes.string,
  buttonWidth: PropTypes.string,
  textSize: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  rounded: PropTypes.bool,
  active: PropTypes.bool,
};

export default Button;
