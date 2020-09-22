import React from "react";
import PropTypes from "prop-types";

// TODO specifiying button width does not have any effect right now
function Button({
  buttonText,
  bgColor = "bg-xmrorange",
  buttonWidth = "w-40",
  textSize = "text-xl",
  onClickFunc = "",
}) {
  const styles =
    bgColor +
    " " +
    buttonWidth +
    " " +
    textSize +
    " mx-auto flex justify-center mt-4 hover:bg-xmrorange-darker text-white rounded-full py-2 px-8 h-auto";
  return (
    <button className={styles} onClick={onClickFunc}>
      {buttonText}
    </button>
  );
}

// Button.propTypes =
export default Button;
