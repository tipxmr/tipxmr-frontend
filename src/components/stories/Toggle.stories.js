import React from "react";
import { Toggle } from "~/components";

export default {
  title: "Toggle",
  component: Toggle,
};

const Template = (args) => <Toggle {...args}>Hallo Welt</Toggle>;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
};
