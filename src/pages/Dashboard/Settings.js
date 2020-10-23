import React, { useState } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { updateStreamer, useStreamer } from "~/context/streamer";
import {
  InputField,
  FileInput,
  Button,
  FloatInput,
  StatBox,
  DropdownField,
} from "~/components";
import {
  useRecoilValue,
  useRecoilCallback,
  useSetRecoilState,
  useRecoilState,
} from "recoil";
import { dispatcherState, streamerState } from "../../store/atom";
import { mergeDeepLeft, omit, clone } from "ramda";

const categoryOptions = ["Politics", "Gaming", "XXX", "Music"];
const platformOptions = ["twitch", "youtube", "chaturbate"];
const languageOptions = [
  "Dutch",
  "English",
  "Esperanto",
  "French",
  "German",
  "Italian",
  "Japanese",
  "Portuguese",
  "Russian",
  "Spanish",
];

function Settings() {
  const streamer = useRecoilValue(streamerState);
  const dispatcher = useRecoilValue(dispatcherState);

  console.log(streamer);
  const [streamerConfig, updateStreamerConfig] = useStreamer();

  // useForm hook
  const { handleSubmit, register, errors } = useForm();

  // TODO Needs to be fixed and replaced with the actual animation URL
  const animationUrl =
    "https://tipxmr.live/" + streamerConfig.displayName + "/animation";

  const onSubmit = (data) => {
    const newStreamerConfig = {
      isPremium: streamerConfig.isPremium,
      displayName: data.displayName,
      creationDate: streamerConfig.creationDate,
      stream: {
        url: data.url,
        platform: data.platform,
        language: data.language,
        description: data.description,
        category: data.category,
      },
      restoreHeight: data.restoreHeight,
      profilePicture: data.profilePicture,
    };
    dispatcher.updateStreamer(newStreamerConfig);
    updateStreamer(updateStreamerConfig, newStreamerConfig);
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <InputField
              name="displayName"
              labelName="Change your display name"
              placeholderName={streamerConfig.displayName}
              register={register({
                required: { value: true, message: "Cannot be empty" },
                maxLength: { value: 15, message: "Maximum of 15 characters" },
                minLength: { value: 3, message: "Minimum of 3 characters" },
              })}
              errors={errors}
            />
            <InputField
              name="url"
              labelName="Set URL to your stream"
              placeholderName={streamerConfig.stream.url}
              register={register({
                required: { value: true, message: "Cannot be empty" },
              })}
              errors={errors}
            />
            <InputField
              name="description"
              labelName="Give your stream a description"
              placeholderName={streamerConfig.stream.description}
              register={register({
                maxLength: { value: 50, message: "Maximum of 50 characters" },
              })}
              errors={errors}
            />
            <FloatInput
              name="restoreHeight"
              labelName="Restore Height for Wallet"
              placeholderName={streamerConfig.restoreHeight}
              register={register({
                min: { value: 0, message: "Cannot be negative" },
              })}
              errors={errors}
            />
            {/* TODO Option to automatically set new restore height? */}
            <FileInput
              name="profilePicture"
              labelName="Change your profile picture"
              accept=".jpg, .jpeg, .png"
              maxFilesize={300 * 1024}
              currentFile={streamerConfig.profilePicture}
              register={register({
                max: { value: 307200, message: "Maximum filesize is 300KB" },
              })}
              errors={errors}
            />
            <DropdownField
              name="language"
              options={languageOptions}
              labelText="Select a language for your stream"
              selected={streamerConfig.stream.language}
              register={register}
              errors={errors}
            />
            <DropdownField
              name="platform"
              options={platformOptions}
              labelText="What platform are you streaming on?"
              selected={streamerConfig.stream.platform}
              errors={errors}
              register={register}
            />
            <DropdownField
              name="category"
              options={categoryOptions}
              labelText="What category describes your stream best?"
              selected={streamerConfig.stream.category}
              register={register}
              errors={errors}
            />
          </div>
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
