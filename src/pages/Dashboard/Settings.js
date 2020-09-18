import React, { useState } from "react";
import PropTypes from "prop-types";

import InputField from "../../components/dump_components/InputField";
import FileInput from "../../components/dump_components/FileInput";
import Button from "../../components/dump_components/Button";
import FloatInput from "../../components/dump_components/FloatInput";
import StatBox from "../../components/dump_components/StatBox";

function Settings({ streamerConfig, setStreamerConfig }) {
  // copy complete state so useEffect is not triggered
  const [proxyState, setProxyState] = useState({ ...streamerConfig });

  // currently not in use yet
  // TODO really update the StreamerConfig
  function setStreamerSettings(key, value) {
    setProxyState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  }
  return (
    <div className="h-full text-xmrgray-darker">
      <div>
        <div className="text-center text-xl underline mb-4">
          Account Summary
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-5">
          <StatBox
            boxTitle="Your display name"
            boxStat={proxyState.displayName}
          />
          <StatBox
            boxTitle="Premium account"
            boxStat={proxyState.accountTier.premium}
          />
          <StatBox boxTitle="Member since" boxStat={proxyState.creationDate} />
          <StatBox
            boxTitle="Animation URL"
            boxStat="https://tipxmr.live/username/animation"
          />
        </div>
        <div className="text-center text-xl underline mb-4">
          Change your Settings:
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <InputField
            name="displayName"
            labelName="Change your display name"
            placeholderName={proxyState.displayName}
            stateSetter={setProxyState}
          />
          <InputField
            /* TODO Fix this, nested object in streamerConfig */
            name="streamURL"
            labelName="Set URL to your stream"
            placeholderName={proxyState.streamURLS}
            stateSetter={setProxyState}
          />
          <FloatInput
            name="restoreHeight"
            labelName="Restore Height for Wallet"
            placeholderName={proxyState.restoreHeight}
            stateSetter={setProxyState}
          />
          <FileInput
            name="profilePicture"
            labelName="Change your profile picture"
            placeholderName={proxyState.profilePicture}
            stateSetter={setProxyState}
          />
        </div>

        <Button buttonText="Save Settings" />
      </div>
    </div>
  );
}

Settings.propTypes = {
  streamerConfig: PropTypes.object,
  setStreamerConfig: PropTypes.func,
};

export default Settings;
