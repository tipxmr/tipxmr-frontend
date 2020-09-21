import React, { useState } from "react";
import PropTypes from "prop-types";

import {
  InputField,
  FileInput,
  FloatInput,
  CheckboxField,
  Button,
} from "../../components";

function AnimationSettings({ streamerConfig, setStreamerConfig }) {
  const [proxyState, setProxyState] = useState({ ...streamerConfig });
  function setAnimationSettings(key, value) {
    // always previous state
    setProxyState((prevState) => ({
      ...prevState,
      animationSettings: { ...prevState.animationSettings, [key]: value },
    }));
  }
  // fontSize (Dropdown)
  // gifsMinAmount
  // charLimit
  return (
    <div className="h-full text-xmrgray-darker">
      <div className="mx-auto">
        <div className="text-center text-xl underline mb-4">
          Change your Animation:
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <FloatInput
            name="secondPrice"
            labelName="The price of 1 second (in XMR)"
            placeholderName={proxyState.animationSettings.secondPrice}
            stateSetter={setAnimationSettings}
          />
          <FloatInput
            name="charLimit"
            labelName="Maximum characters allowed for messages"
            placeholderName={proxyState.animationSettings.charLimit}
            stateSetter={setAnimationSettings}
          />

          {/* TODO Create a new component to pick the color */}
          <InputField
            name="fontColor"
            labelName="Hexcode for font color"
            placeholderName={proxyState.animationSettings.fontColor}
            stateSetter={setAnimationSettings}
          />
          <FloatInput
            name="minAmount"
            labelName="Minimum amount of a donation (in XMR)"
            placeholderName={proxyState.animationSettings.minAmount}
            stateSetter={setAnimationSettings}
          />
          <FloatInput
            name="goal"
            labelName="Set a donation goal for your stream (in XMR)"
            placeholderName={proxyState.animationSettings.goal}
            stateSetter={setAnimationSettings}
          />
          <CheckboxField
            name="showGoal"
            labelName="Display donation goal in stream"
            defaultChecked={proxyState.animationSettings.showGoal}
            stateSetter={setAnimationSettings}
          />
          <CheckboxField
            name="gifs"
            labelName="Allow users to send gifs"
            defaultChecked={proxyState.animationSettings.gifs}
            stateSetter={setAnimationSettings}
          />
          <FloatInput
            name="gifsMinAmount"
            labelName="Minimum amount to send gifs"
            placeholderName={proxyState.animationSettings.gifsMinAmount}
            stateSettter={setAnimationSettings}
          />
          <CheckboxField
            name="fontShadow"
            labelName="Turn on text shadow"
            defaultChecked={proxyState.animationSettings.fontShadow}
            stateSetter={setAnimationSettings}
          />
          {/* TODO Create a new Component for files */}
          <FileInput
            name="sound"
            labelName="Upload a custom MP3 for donations"
            placeholderName={proxyState.animationSettings.sound}
            stateSetter={setAnimationSettings}
          />
          <FileInput
            name="bgImg"
            labelName="Upload custom background image for donations"
            placeholderName={proxyState.animationSettings.bgImg}
            stateSetter={setAnimationSettings}
          />
        </div>

        <Button buttonText="Save" />
      </div>
    </div>
  );
}
AnimationSettings.propTypes = {
  streamerConfig: PropTypes.object,
  setStreamerConfig: PropTypes.func,
};

export default AnimationSettings;
