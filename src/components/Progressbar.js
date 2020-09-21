import React from "react";
import PropTypes from "prop-types";

function Progressbar({ percentage, isSyncActive, isSynced }) {
  return (
    <div className="relative pt-1">
      <div className="flex mb-2 items-center justify-between">
        <div>
          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-xmrorange-darkest bg-xmrorange-lightest">
            {isSyncActive && isSynced ? "sync completed" : null}
            {isSyncActive && !isSynced ? "syncing" : null}
            {!isSyncActive ? "sync stopped" : null}
          </span>
        </div>
        <div className="text-right">
          <span className="text-xs font-semibold inline-block text-xmrorange-darker">
            {percentage}%
          </span>
        </div>
      </div>
      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-xmrorange-lightest">
        <div
          style={{ width: percentage + "%" }}
          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-xmrorange-darkest"
        ></div>
      </div>
    </div>
  );
}
Progressbar.propTypes = {
  percentage: PropTypes.number,
  isSyncActive: PropTypes.bool,
  isSynced: PropTypes.bool,
};

export default Progressbar;
