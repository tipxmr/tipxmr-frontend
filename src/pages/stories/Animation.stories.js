import React from "react";
import { Animation } from "~/components";

export default {
  title: "Animation",
  component: Animation,
};

const Template = (args) => <Animation {...args}>Hallo Welt</Animation>;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
};
