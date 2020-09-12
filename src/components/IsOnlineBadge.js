import React from "react";
import PropTypes from "prop-types";

function IsOnlineBadge({ isOnline }) {
  function onlineBadge() {
    return (
      <button
        type="button"
        className="pointer-events-none mx-auto bg-green-600 text-white p-2 rounded leading-none flex items-center"
      >
        online
      </button>
    );
  }

  function offlineBadge() {
    return (
      <button
        type="button"
        className="pointer-events-none mx-auto bg-red-600 text-white p-2 rounded leading-none flex items-center"
      >
        offline
      </button>
    );
  }

  return <div>{isOnline ? onlineBadge() : offlineBadge()}</div>;
}
IsOnlineBadge.propTypes = {
  isOnline: PropTypes.bool,
};

export default IsOnlineBadge;
