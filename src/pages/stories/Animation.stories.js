import React from "react";
import { Animation } from "~/pages";

export default {
  title: "pages/Animation",
  component: Animation,
};

const Template = (args) => <Animation {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
};
