import React, { useState } from "react";
import { useForm } from "react-hook-form";
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
const platformOptions = ["twitch", "youtube", "chaturbate"];
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
  // useForm makes this redunant most likely
  const [streamerConfig, updateStreamerConfig] = useStreamer();
  const [isPremium, setIsPremium] = useState(streamerConfig.isPremium);
  const [creationDate, setCreationDate] = useState(streamerConfig.creationDate);
  // const [url, setUrl] = useState(streamerConfig.stream.url);
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

  // useForm hook
  const { handleSubmit, register, errors } = useForm();

  function submit() {
    const newStreamerConfig = {
      isPremium,
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
      // updateStreamer(updateStreamerConfig, newStreamerConfig);
    };
  }

  // TODO Needs to be fixed and replaced with the actual animation URL
  const animationUrl =
    "https://tipxmr.live/" + streamerConfig.displayName + "/animation";

  const onSubmit = (data) => {
    console.log(data); // data should have everything, just like newStreamerConfig
    // actually write the new config
    // updateStreamer(updateStreamerConfig, newStreamerConfig);
  };

  return (
    <div className="flex-grow text-gray-200">
      <div className="mx-auto">
        <div className="my-6">
          {/* TODO fix with display name */}
          <StatBox
            boxTitle="Your display name"
            boxStat={streamerConfig.displayName}
          />
          <StatBox
            boxTitle="Account tier:"
            boxStat={streamerConfig.isPremium ? "premium" : "basic"}
          />
          <StatBox
            boxTitle="Member since"
            boxStat={streamerConfig.creationDate}
          />
          <StatBox
            boxTitle="Point OBS to this URL"
            boxStat={animationUrl}
            smaller={true}
          />
        </div>
        <div className="text-center text-xl underline mb-4">
          Change your Settings:
        </div>
        <form
          className="grid grid-cols-1 md:grid-cols-3 gap-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputField
            name="displayName"
            labelName="Change your display name"
            placeholderName={streamerConfig.displayName}
            register={register}
            errors={errors}
            required={true}
          />
          <InputField
            name="url"
            labelName="Set URL to your stream"
            placeholderName={streamerConfig.stream.url}
            register={register}
            errors={errors}
            required={true}
          />
          <InputField
            name="description"
            labelName="Give your stream a description"
            placeholderName={streamerConfig.stream.description}
            register={register}
            errors={errors}
            required={true}
          />
          <FloatInput
            name="restoreHeight"
            labelName="Restore Height for Wallet"
            placeholderName={streamerConfig.restoreHeight}
            register={register}
            errors={errors}
          />
          {/* TODO Option to automatically set new restore height? */}
          <FileInput
            name="profilePicture"
            labelName="Change your profile picture"
            accept=".jpg, .jpeg, .png"
            maxFilesize={300 * 1024}
            placeholderName={profilePicture}
            register={register}
            errors={errors}
            required={true}
          />
          <DropdownField
            name="language"
            options={languageOptions}
            labelText="Select a language for your stream"
            selected={streamerConfig.stream.language}
            register={register}
            errors={errors}
            required={true}
          />
          <DropdownField
            name="platform"
            options={platformOptions}
            labelText="What platform are you streaming on?"
            selected={streamerConfig.stream.platform}
            errors={errors}
            register={register}
            required={true}
          />
          <DropdownField
            name="category"
            options={categoryOptions}
            labelText="What category describes your stream best?"
            selected={streamerConfig.stream.category}
            register={register}
            errors={errors}
            required={true}
          />
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
}

Settings.propTypes = {
  streamerConfig: PropTypes.object,
  setStreamerConfig: PropTypes.func,
};

export default Settings;
