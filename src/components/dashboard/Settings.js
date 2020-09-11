import React, { useState } from "react";
import PropTypes from "prop-types";

function Settings({ streamerConfig, setStreamerConfig }) {
  return (
    <div>
      <input
        placeholder={streamerConfig.streamerName}
        onChange={(e) => {
          setStreamerConfig(...streamerConfig, (streamerName = e.target.value));
          console.log(streamerConfig.streamerName);
        }}
      ></input>
    </div>
  );
}

Settings.propTypes = {
  streamerConfig: PropTypes.object,
  setStreamerConfig: PropTypes.func,
};

export default Settings;
