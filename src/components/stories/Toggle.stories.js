import React from "react";
import { Toggle } from "~/components";

export default {
  title: "dumb/Toggle",
  component: Toggle,
};

const Template = (args) => <Toggle {...args}>Here is a text</Toggle>;

export const Checked = Template.bind({});
Checked.args = {
  isChecked: true,
};

export const Unchecked = Template.bind({});
Unchecked.args = {
  isChecked: false,
};
