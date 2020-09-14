import React, { useState } from "react";
import PropTypes from "prop-types";
import Animation from "../Animation";
import Savebutton from "../dump_components/Savebutton";
import InputField from "../dump_components/InputField";

function AnimationSettings({ streamerConfig, setStreamerConfig }) {
  const [proxyState, setProxyState] = useState({ ...streamerConfig });
  // secondPrice
  // fontColor
  // fontSize (Dropdown)
  // minAmount
  // gifs (on/off)
  // fontShadow (On/Off)
  // showGoal (on/off)
  // gifsMinAmount
  // goal:
  // charLimit
  // sound (upload)
  // bgImg (upload)
  return (
    <div className="h-full text-xmrgray-darker">
      <div className="mx-auto">
        <div className="text-center text-xl underline mb-4">
          Change your Animation:
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-1">
          <InputField
            configKey="secondPrice"
            labelName="The price of 1 second (in XMR)"
            placeholderName={proxyState.animationSettings.secondPrice}
            fieldType="text"
            stateSetter={setProxyState}
            baseState={proxyState}
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
          <InputField
            configKey="showGoal"
            labelName="Show your goal in Animation?"
            placeholderName={proxyState.animationSettings.showGoal}
            fieldType="checkbox"
            stateSetter={setProxyState}
            baseState={proxyState}
          />
          <InputField
            configKey="gifs"
            labelName="Allow users to send gifs"
            placeholderName={proxyState.animationSettings.gifs}
            fieldType="checkbox"
            stateSetter={setProxyState}
            baseState={proxyState}
          />
          <InputField
            configKey="fontShadow"
            labelName="Turn on text shadow"
            placeholderName={proxyState.animationSettings.fontShadow}
            fieldType="checkbox"
            stateSetter={setProxyState}
            baseState={proxyState}
          />
          <InputField
            configKey="goal"
            labelName="Set a donation goal for your stream (in XMR)"
            placeholderName={proxyState.animationSettings.showGoal}
            fieldType="checkbox"
            stateSetter={setProxyState}
            baseState={proxyState}
          />
        </div>
      </div>
      <Savebutton />
    </div>
  );
}
AnimationSettings.propTypes = {
  streamerConfig: PropTypes.object,
  setStreamerConfig: PropTypes.func,
};

export default AnimationSettings;
