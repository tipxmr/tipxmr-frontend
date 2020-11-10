import React from "react";
import { ProfilePicture } from "~/components";

export default {
  title: "defect/ProfilePicture",
  component: ProfilePicture,
};

const Template = (args) => (
  <ProfilePicture {...args}>Hallo Welt</ProfilePicture>
);

export const Primary = Template.bind({});
Primary.args = {
  streamer: {
    profilePicture: "https://imgur.com/a/8uLnjT1",
  },
  displayName: "AlexAnarcho",
};
