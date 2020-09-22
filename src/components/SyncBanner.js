import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

function SyncBanner({ synced }) {
  return (
    <div
      className={clsx("rounded", "p-3", "w-full", {
        "bg-green-500": synced,
        "bg-red-500": !synced,
      })}
    >
      {synced ? "You are up to date" : "Your wallet still needs to catch up"}
    </div>
  );
}

SyncBanner.propTypes = {
  synced: PropTypes.bool,
};

export default SyncBanner;
