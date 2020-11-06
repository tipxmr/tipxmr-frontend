import React from "react";
import { ProfilePicture } from "~/components";

export default {
  title: "ProfilePicture",
  component: ProfilePicture,
};

const Template = (args) => (
  <ProfilePicture {...args}>Hallo Welt</ProfilePicture>
);

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
};
