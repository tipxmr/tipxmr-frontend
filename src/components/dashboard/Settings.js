import React, { useState } from "react";
import PropTypes from "prop-types";
import InputField from "../dump_components/InputField";

function Settings({ streamerConfig, setStreamerConfig }) {
  // TODO state for every config option
  const [streamerName, setStreamerName] = useState(streamerConfig.streamerName);
  function handleChange(e) {
    //
  }

  function updateStreamerConfig() {
    // TODO read states and update streamerConfig object
    // use setStreamerConfig, change triggers useEffect that triggers socket
  }
  return (
    <div className="h-full">
      <div className="text-center text-xl underline mb-4">
        Change your Settings:
      </div>
      <label>
        Your displayName:
        <input
          placeholder={streamerConfig.streamerName}
          onChange={(e) => {
            setStreamerConfig({
              ...streamerConfig,
              streamerName: e.target.value,
            });
            console.log(streamerConfig.streamerName);
          }}
        ></input>
      </label>
    </div>
  );
}

Settings.propTypes = {
  streamerConfig: PropTypes.object,
  setStreamerConfig: PropTypes.func,
};

export default Settings;
