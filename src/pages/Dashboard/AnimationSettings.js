import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  InputField,
  FileInput,
  FloatInput,
  CheckboxField,
  Button,
  DropdownField,
} from "~/components";
import { useStreamer, updateAnimationSettings } from "~/context/streamer";

function AnimationSettings() {
  const [streamerConfig, updateStreamerConfig] = useStreamer();

  // useForm hook
  const { handleSubmit, register, errors } = useForm();

  const fontSizeOptions = ["small", "medium", "large", "extra large"];

  const onSubmit = (data) => {
    const newAnimationSettings = {
      secondPrice: data.secondPrice,
      fontColor: data.fontColor,
      fontSize: data.fontSize,
      fontShadow: data.fontShadow,
      minAmount: data.minAmount,
      gifs: data.gifs,
      gifsMinAmount: data.gifsMinAmount,
      showGoal: data.showGoal,
      goal: data.goal,
      goalProgress: streamerConfig.animationSettings.goalProgress,
      goalReached: streamerConfig.animationSettings.goalReached,
      charLimit: data.charLimit,
      charPrice: data.charPrice,
      sound: data.sound,
      bgImg: data.bgImg,
    };
    updateAnimationSettings(updateStreamerConfig, newAnimationSettings);
    console.log("Update successful", newAnimationSettings);
  };

  return (
    <div className="h-full text-gray-200">
      <div className="mx-auto">
        <div className="text-center text-xl underline mb-4">
          Change your Animation:
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* TODO Create a new component to pick the color */}
            <InputField
              name="fontColor"
              labelName="Hexcode for font color"
              placeholderName={streamerConfig.animationSettings.fontColor}
              register={register}
              errors={errors}
            />
            <FloatInput
              name="secondPrice"
              labelName="The price of 1 second (in XMR)"
              placeholderName={streamerConfig.animationSettings.secondPrice}
              register={register({
                min: { value: 0, message: "Cannot be negative" },
              })}
              errors={errors}
            />
            <FloatInput
              name="charPrice"
              labelName="The price of 1 character (in XMR)"
              placeholderName={streamerConfig.animationSettings.charPrice}
              register={register({
                min: { value: 0, message: "Cannot be negative" },
              })}
              errors={errors}
            />

            <FloatInput
              name="charLimit"
              labelName="Maximum characters allowed for messages"
              placeholderName={streamerConfig.animationSettings.charLimit}
              register={register({
                min: { value: 0, message: "Cannot be negative" },
                max: {
                  value: 1000,
                  message: "Maximal length is 1000 characters",
                },
              })}
              errors={errors}
            />
            <FloatInput
              name="minAmount"
              labelName="Minimum amount of a donation (in XMR)"
              placeholderName={streamerConfig.animationSettings.minAmount}
              register={register({
                min: { value: 0, message: "Cannot be negative" },
              })}
              errors={errors}
            />
            <FloatInput
              name="goal"
              labelName="Set a donation goal for your stream (in XMR)"
              placeholderName={streamerConfig.animationSettings.goal}
              register={register({
                min: { value: 0, message: "Cannot be negative" },
              })}
              errors={errors}
            />
            <FloatInput
              name="gifsMinAmount"
              labelName="Minimum amount to send gifs"
              placeholderName={streamerConfig.animationSettings.gifsMinAmount}
              register={register({
                min: { value: 0, message: "Cannot be negative" },
              })}
              errors={errors}
            />
            <CheckboxField
              name="showGoal"
              labelName="Display donation goal in stream"
              defaultChecked={streamerConfig.animationSettings.showGoal}
              register={register}
            />
            <CheckboxField
              name="gifs"
              labelName="Allow users to send gifs"
              defaultChecked={streamerConfig.animationSettings.gifs}
              register={register}
            />
            <CheckboxField
              name="fontShadow"
              labelName="Turn on text shadow"
              defaultChecked={streamerConfig.animationSettings.fontShadow}
              register={register}
            />
            <FileInput
              name="sound"
              labelName="Upload a custom MP3 for donations"
              currentFile={streamerConfig.animationSettings.sound}
              register={register({
                max: { value: 307200, message: "Maximum filesize is 300KB" },
              })}
              errors={errors}
            />
            <FileInput
              name="bgImg"
              labelName="Upload custom background image for donations"
              currentFile={streamerConfig.animationSettings.bgImg}
              register={register({
                max: { value: 307200, message: "Maximum filesize is 300KB" },
              })}
              errors={errors}
            />
            <DropdownField
              name="fontSize"
              options={fontSizeOptions}
              labelText="Select a font size"
              selected={streamerConfig.animationSettings.fontSize}
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

export default AnimationSettings;
