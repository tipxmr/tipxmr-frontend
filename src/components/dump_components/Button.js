import React from "react";

function Button({
  buttonText,
  bgColor = "bg-xmrorange",
  buttonSize = "w-40 h-auto",
  textSize = "text-xl",
}) {
  const styles =
    bgColor +
    " " +
    buttonSize +
    " " +
    textSize +
    " mx-auto flex justify-center py-2 px-8 rounded text-white border-xmrgray border-2 hover:bg-xmrorange-darker hover:border-white";
  console.log(styles);
  return <button className={styles}>{buttonText}</button>;
}

export default Button;
