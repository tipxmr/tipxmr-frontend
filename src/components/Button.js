import React from "react";
import PropTypes from "prop-types";
import { FaSpinner } from "react-icons/fa";
import clsx from "clsx";

function Button({
  children,
  bgColor = "bg-xmrorange",
  buttonWidth = "w-auto",
  textSize = "text-xl",
  onClick = () => {},
  disabled = false,
  loading = false,
}) {
  const styles = clsx([
    bgColor,
    buttonWidth,
    textSize,
    "mx-auto",
    "flex",
    "justify-center",
    "hover:bg-xmrorange-darker",
    "text-white",
    "rounded",
    "py-2",
    "px-4",
    "h-auto",
    "disabled:opacity-75",
    "disabled:cursor-not-allowed",
    "focus:outline-none",
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
};

// Button.propTypes =
export default Button;
