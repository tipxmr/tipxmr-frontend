import React from "react";
import { InputField } from "~/components";

export default {
  title: "dumb/InputField",
  component: InputField,
};

const Template = (args) => <InputField {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  labelName: "InputField",
  name: "InputField",
  placeholderName: "This is some text",
  register: {},
  errors: {},
};
