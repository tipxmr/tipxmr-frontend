import React, { useState } from "react";
import PropTypes from "prop-types";
import { updateStreamer, useStreamer } from "../../context/streamer";

import {
  InputField,
  FileInput,
  Button,
  FloatInput,
  StatBox,
  DropdownField,
} from "~/components";

const categoryOptions = ["Politics", "Gaming", "XXX", "Music"];
const platformOptions = ["Twitch", "YouTube", "Chaturbate"];
const languageOptions = [
  "Dutch",
  "English",
  "Esperanto",
  "French",
  "🇬🇧 German",
  "Italian",
  "Japanese",
  "Portuguese",
  "Russian",
  "Spanish",
];

function Settings() {
  const [streamerConfig, updateStreamerConfig] = useStreamer();
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
  const [isPremium, setIsPremium] = useState(
    streamerConfig.accountTier.premium
  );
  const [displayName, setDisplayName] = useState(streamerConfig.displayName);
  const [creationDate, setCreationDate] = useState(streamerConfig.creationDate);
  const [url, setUrl] = useState(streamerConfig.stream.url);
  const [platform, setPlatform] = useState(streamerConfig.stream.platform);
  const [language, setLanguage] = useState(streamerConfig.stream.language);
  const [description, setDescription] = useState(
    streamerConfig.stream.description
  );
  const [category, setCategory] = useState(streamerConfig.stream.category);

  const [restoreHeight, setRestoreHeight] = useState(
    streamerConfig.restoreHeight
  );
  const [profilePicture, setProfilePicture] = useState(
    streamerConfig.profilePicture
  );

  function submit() {
    const newStreamerConfig = {
      accountTier: { premium: isPremium },
      displayName,
      creationDate,
      stream: {
        url,
        platform,
        description,
        language,
        category,
      },
      restoreHeight,
      profilePicture,
    };
    updateStreamer(updateStreamerConfig, newStreamerConfig);
  }

  let tier;
  if (isPremium) {
    tier = "premium";
  } else {
    tier = "basic";
  }
  return (
    <div className="h-full text-xmrgray-darker">
      <div>
        <div className="text-center text-xl underline mb-4">
          Account Summary
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-5">
          <StatBox boxTitle="Your display name" boxStat={displayName} />
          <StatBox boxTitle="Premium account" boxStat={tier} />
          <StatBox boxTitle="Member since" boxStat={creationDate} />
          <StatBox
            boxTitle="Animation URL"
            boxStat="https:tipxmr.live/username/animation"
          />
        </div>
        <div className="text-center text-xl underline mb-4">
          Change your Settings:
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <InputField
            name="displayName"
            labelName="Change your display name"
            placeholderName={displayName}
            stateSetter={setDisplayName}
          />
          <InputField
            /* TODO Fix this, nested object in streamerConfig */
            name="url"
            labelName="Set URL to your stream"
            placeholderName={url}
            stateSetter={setUrl}
          />
          <InputField
            /* TODO Fix this, nested object in streamerConfig */
            name="description"
            labelName="Give your stream a description"
            placeholderName={description}
            stateSetter={setDescription}
          />
          <FloatInput
            name="restoreHeight"
            labelName="Restore Height for Wallet"
            placeholderName={restoreHeight}
            stateSetter={setRestoreHeight}
          />
          {/* TODO Option to automatically set new restore height? */}
          <FileInput
            name="profilePicture"
            labelName="Change your profile picture"
            placeholderName={profilePicture}
            stateSetter={setProfilePicture}
          />
          <DropdownField
            options={languageOptions}
            labelText="Select a language for your stream"
            stateSetter={setLanguage}
            selected={language}
          />
          <DropdownField
            options={platformOptions}
            labelText="What platform are you streaming on?"
            stateSetter={setPlatform}
            selected={platform}
          />
          <DropdownField
            options={categoryOptions}
            labelText="What category describes your stream best?"
            stateSetter={setCategory}
            selected={category}
          />
        </div>

        <Button onClick={() => submit()}>Save</Button>
      </div>
    </div>
  );
}

Settings.propTypes = {
  streamerConfig: PropTypes.object,
  setStreamerConfig: PropTypes.func,
};

export default Settings;
