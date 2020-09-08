import React, { useState } from "react";
import PropTypes from "prop-types";

function Settings({ config }) {
  const [streamername, setStreamername] = useState(config.streamername);
  return (
    <div>
      <input
        placeholder={config.streamername}
        onChange={(e) => {
          setStreamername(e.target.value);
          console.log(streamername);
        }}
      ></input>
    </div>
  );
}

Settings.propTypes = {
  config: PropTypes.object,
};

export default Settings;
