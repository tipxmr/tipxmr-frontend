import React, { useState } from "react";
import PropTypes from "prop-types";

import {
  InputField,
  FileInput,
  FloatInput,
  CheckboxField,
  Button,
  DropdownField,
} from "~/components";
const fontSizeOptions = ["small", "medium", "large", "extra large"];

function AnimationSettings({ streamerConfig, setStreamerConfig }) {
  const [proxyState, setProxyState] = useState({ ...streamerConfig });
  function setAnimationSettings(key, value) {
    // always previous state
    setProxyState((prevState) => ({
      ...prevState,
      animationSettings: { ...prevState.animationSettings, [key]: value },
    }));
  }
  // TODO separate states for all settings
  const [secondPrice, setSecondPrice] = useState(
    streamerConfig.animationSettings.secondPrice
  );
  const [charLimit, setCharLimit] = useState(
    streamerConfig.animationSettings.charLimit
  );
  const [fontColor, setFontColor] = useState(
    streamerConfig.animationSettings.fontColor
  );
  const [minAmount, setMinAmount] = useState(
    streamerConfig.animationSettings.minAmount
  );
  const [goal, setGoal] = useState(streamerConfig.animationSettings.goal);
  const [showGoal, setShowGoal] = useState(
    streamerConfig.animationSettings.showGoal
  );
  const [gifs, setGifs] = useState(streamerConfig.animationSettings.gifs);
  const [gifsMinAmount, setGifsMinAmount] = useState(
    streamerConfig.animationSettings.gifsMinAmount
  );

  const [fontShadow, setFontShadow] = useState(
    streamerConfig.animationSettings.fontShadow
  );
  const [sound, setSound] = useState(streamerConfig.animationSettings.sound);
  const [bgImg, setBgImg] = useState(streamerConfig.animationSettings.bgImg);
  const [fontSize, setFontSize] = useState(
    streamerConfig.animationSettings.fontSize
  );

  function submit() {
    console.log(
      gifsMinAmount,
      secondPrice,
      charLimit,
      fontColor,
      minAmount,
      goal,
      showGoal,
      gifs,
      fontShadow,
      sound,
      bgImg
    );
  }
  // TODO onSubmit function on button to log

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
            placeholderName={secondPrice}
            stateSetter={setSecondPrice}
          />
          <FloatInput
            name="charLimit"
            labelName="Maximum characters allowed for messages"
            placeholderName={charLimit}
            stateSetter={setCharLimit}
          />

          {/* TODO Create a new component to pick the color */}
          <InputField
            name="fontColor"
            labelName="Hexcode for font color"
            placeholderName={fontColor}
            stateSetter={setFontColor}
          />
          <FloatInput
            name="minAmount"
            labelName="Minimum amount of a donation (in XMR)"
            placeholderName={minAmount}
            stateSetter={setMinAmount}
          />
          <FloatInput
            name="goal"
            labelName="Set a donation goal for your stream (in XMR)"
            placeholderName={goal}
            stateSetter={setGoal}
          />
          <CheckboxField
            name="showGoal"
            labelName="Display donation goal in stream"
            defaultChecked={showGoal}
            stateSetter={setShowGoal}
          />
          <CheckboxField
            name="gifs"
            labelName="Allow users to send gifs"
            defaultChecked={gifs}
            stateSetter={setGifs}
          />
          <FloatInput
            name="gifsMinAmount"
            labelName="Minimum amount to send gifs"
            placeholderName={gifsMinAmount}
            stateSetter={setGifsMinAmount}
          />
          <CheckboxField
            name="fontShadow"
            labelName="Turn on text shadow"
            defaultChecked={fontShadow}
            stateSetter={setFontShadow}
          />
          {/* TODO Create a new Component for files */}
          <FileInput
            name="sound"
            labelName="Upload a custom MP3 for donations"
            placeholderName={sound}
            stateSetter={setSound}
          />
          <FileInput
            name="bgImg"
            labelName="Upload custom background image for donations"
            placeholderName={bgImg}
            stateSetter={setBgImg}
          />
          <DropdownField
            options={fontSizeOptions}
            labelText="Select a font size"
            selected={fontSize}
            stateStter={setFontSize}
          />
        </div>
        <Button onClick={() => submit()}>Save</Button>
      </div>
    </div>
  );
}
AnimationSettings.propTypes = {
  streamerConfig: PropTypes.object,
  setStreamerConfig: PropTypes.func,
};

export default AnimationSettings;
