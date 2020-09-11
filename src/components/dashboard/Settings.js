import React, { useState } from "react";
import PropTypes from "prop-types";
import InputField from "../dump_components/InputField";

function Settings({ streamerConfig, setStreamerConfig }) {
  // TODO state for every config option
  const [state, setState] = useState(streamerConfig);
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
      <InputField
        name="displayName"
        labelName="Change your display name"
        placeholder={state.displayName}
        type="text"
      />
    </div>
  );
}

Settings.propTypes = {
  streamerConfig: PropTypes.object,
  setStreamerConfig: PropTypes.func,
};

export default Settings;
