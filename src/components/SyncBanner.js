import React from "react";
import PropTypes from "prop-types";

function SyncBanner({ synced }) {
  if (synced) {
    return (
      <div className="rounded p-3 bg-green-500 w-full">You are up to date</div>
    );
  }
  return (
    <div className="rounded p-3 bg-red-500 w-full">
      Your wallet still needs to catch up
    </div>
  );
}

SyncBanner.propTypes = {
  synced: PropTypes.bool,
};

export default SyncBanner;
