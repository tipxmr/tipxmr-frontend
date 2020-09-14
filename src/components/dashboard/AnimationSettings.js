import React, { useState } from "react";
import PropTypes from "prop-types";
import Animation from "../Animation";
import Savebutton from "../dump_components/Savebutton";
import InputField from "../dump_components/InputField";
import CheckboxField from "../dump_components/CheckboxField";

function AnimationSettings({ streamerConfig, setStreamerConfig }) {
  const [proxyState, setProxyState] = useState({ ...streamerConfig });
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
          <InputField
            configKey="secondPrice"
            labelName="The price of 1 second (in XMR)"
            placeholderName={proxyState.animationSettings.secondPrice}
            fieldType="text"
            stateSetter={setProxyState}
            baseState={proxyState}
            className="col-span-1"
          />
          <InputField
            configKey="fontColor"
            labelName="Hexcode for font color"
            placeholderName={proxyState.animationSettings.fontColor}
            fieldType="color"
            stateSetter={setProxyState}
            baseState={proxyState}
          />
          <InputField
            configKey="minAmount"
            labelName="Minimum amount of a donation (in XMR)"
            placeholderName={proxyState.animationSettings.minAmount}
            fieldType="text"
            stateSetter={setProxyState}
            baseState={proxyState}
          />
          <InputField
            configKey="goal"
            labelName="Set a donation goal for your stream (in XMR)"
            placeholderName={proxyState.animationSettings.goal}
            fieldType="text"
            stateSetter={setProxyState}
            baseState={proxyState}
          />
          <CheckboxField
            configKey="showGoal"
            labelName="Show your goal in Animation?"
            defaultChecked={proxyState.animationSettings.showGoal}
            stateSetter={setProxyState}
            baseState={proxyState}
          />
          <CheckboxField
            configKey="gifs"
            labelName="Allow users to send gifs"
            defaultChecked={proxyState.animationSettings.gifs}
            stateSetter={setProxyState}
            baseState={proxyState}
          />
          <CheckboxField
            configKey="fontShadow"
            labelName="Turn on text shadow"
            defaultChecked={proxyState.animationSettings.fontShadow}
            stateSetter={setProxyState}
            baseState={proxyState}
          />
          <InputField
            configKey="sound"
            labelName="Upload a custom MP3 for donations"
            placeholderName={proxyState.animationSettings.sound}
            fieldType="file"
            stateSetter={setProxyState}
            baseState={proxyState}
          />
          <InputField
            configKey="bgImg"
            labelName="Upload custom background image for donations"
            placeholderName={proxyState.animationSettings.bgImg}
            fieldType="file"
            stateSetter={setProxyState}
            baseState={proxyState}
          />
        </div>

        <Savebutton />
      </div>
    </div>
  );
}
AnimationSettings.propTypes = {
  streamerConfig: PropTypes.object,
  setStreamerConfig: PropTypes.func,
};

export default AnimationSettings;
