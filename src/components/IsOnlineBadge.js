import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

function IsOnlineBadge({ isOnline }) {
  return (
    <button
      type="button"
      className={clsx(
        "pointer-events-none",
        "mx-auto",
        "text-white",
        "rounded",
        "leading-none",
        "items-center",
        {
          "bg-green-600": isOnline,
          "bg-red-600": !isOnline,
        }
      )}
    >
      {isOnline ? "online" : "offline"}
    </button>
  );
}
IsOnlineBadge.propTypes = {
  isOnline: PropTypes.bool,
};

export default IsOnlineBadge;
