import React from "react";
import PropTypes from "prop-types";

function StatBox({ boxTitle, boxStat }) {
  return (
    <div className="rounded overflow-hidden shadow-lg text-center bg-xmrgray-darker text-xmrorange-lighter">
      <div className="px-4 py-6">
        <p>{boxTitle}</p>
        <div className="text-4xl my-2">{boxStat}</div>
      </div>
    </div>
  );
}

StatBox.propTypes = {
  boxTitle: PropTypes.str,

  // cannot really include the boxStat since it may be a string or a number (float)
};
export default StatBox;
