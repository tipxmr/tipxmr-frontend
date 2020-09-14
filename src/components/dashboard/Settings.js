import React, { useState } from "react";
import PropTypes from "prop-types";
import InputField from "../dump_components/InputField";
import Savebutton from "../dump_components/Savebutton";

function Settings({ streamerConfig, setStreamerConfig }) {
  // copy complete state so useEffect is not triggered
  const [proxyState, setProxyState] = useState({ ...streamerConfig });

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
          placeholderName={proxyState.displayName}
          fieldType="text"
          stateSetter={setProxyState}
          baseState={proxyState}
        />
        <InputField
          configKey="streamURLS.twitch"
          labelName="Set URL to your stream"
          placeholderName={proxyState.streamURLS.twitch}
          fieldType="text"
          stateSetter={setProxyState}
          baseState={proxyState}
        />
        <InputField
          configKey="restoreHeight"
          labelName="Restore Height for Wallet"
          placeholderName={proxyState.restoreHeight}
          fieldType="text"
          stateSetter={setProxyState}
          baseState={proxyState}
        />
        <InputField
          configKey="profilePicture"
          labelName="Change your profile picture"
          placeholderName={proxyState.profilePicture}
          fieldType="image"
          stateSetter={setProxyState}
          baseState={proxyState}
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
