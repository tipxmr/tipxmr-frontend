import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

const SyncBanner = ({ synced }) => {
  return (
    <div
      className={clsx(
        "rounded",
        "p-3",
        "w-full",
        "text-center",
        "text-xmrgray-darker",
        {
          "bg-green-400": synced,
          "bg-red-400": !synced,
        }
      )}
    >
      {synced ? "You are up to date" : "Your wallet still needs to catch up"}
    </div>
  );
}

SyncBanner.propTypes = {
  synced: PropTypes.bool,
};

export default SyncBanner;
