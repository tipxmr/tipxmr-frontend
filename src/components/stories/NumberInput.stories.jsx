import React from "react";
import { NumberInput } from "~/components";

export default {
  title: "dumb/NumberInput",
  component: NumberInput,
};

const Template = (args) => <NumberInput {...args}>Hallo Welt</NumberInput>;

export const Integer = Template.bind({});
Integer.args = {
  primary: true,
  name: "NumberInput",
  labelName: "NumberInput",
  placeholderName: "1234",
  numType: "int",
  register: {},
  errors: {},
};
