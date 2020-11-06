import React from "react";
import { InputField } from "~/components";

export default {
  title: "InputField",
  component: InputField,
};

const Template = (args) => <InputField {...args}>Hallo Welt</InputField>;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
};
