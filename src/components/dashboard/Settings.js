import React, { useState } from "react";
import PropTypes from "prop-types";
import InputField from "../dump_components/InputField";
import Savebutton from "../dump_components/Savebutton";

function Settings({ streamerConfig, setStreamerConfig }) {
  // TODO state for every config option
  const [displayName, setDisplayName] = useState(streamerConfig.displayName);
  const [streamURLS, setStreamURLS] = useState(streamerConfig.streamURLS);
  const [restoreHeight, setRestoreHeight] = useState(
    streamerConfig.restoreHeight
  );
  const [profilePicture, setProfilePicture] = useState(
    streamerConfig.profilePicture
  );
  // const [displayName, setDisplayName] = useState(streamerConfig.displayName);
  // const [displayName, setDisplayName] = useState(streamerConfig.displayName);
  // const [displayName, setDisplayName] = useState(streamerConfig.displayName);

  function handleChange(e) {
    //
  }

  function updateStreamerConfig() {
    // TODO read states and update streamerConfig object
    // use setStreamerConfig, change triggers useEffect that triggers socket
  }
  return (
    <div className="h-full text-xmrgray-darker">
      <div className="m-3 w-3/4 mx-auto bg-gray-200">Testing</div>
      <div>
        <div className="text-center text-xl underline mb-4">
          Change your Settings:
        </div>
        <InputField
          configKey="displayName"
          labelName="Change your display name"
          placeholderName={displayName}
          fieldType="text"
        />
        <InputField
          configKey="streamURLS.twitch"
          labelName="Set URL to your stream"
          placeholderName={streamURLS.twitch}
          fieldType="text"
        />
        <InputField
          configKey="restoreHeight"
          labelName="Restore Height for Wallet"
          placeholderName={restoreHeight}
          fieldType="text"
        />
        <InputField
          configKey="profilePicture"
          labelName="Change your profile picture"
          placeholderName={profilePicture}
          fieldType="image"
        />
      </div>
      <Savebutton />
    </div>
  );
}

Settings.propTypes = {
  streamerConfig: PropTypes.object,
  setStreamerConfig: PropTypes.func,
};

export default Settings;
