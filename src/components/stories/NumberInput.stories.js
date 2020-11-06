import React from "react";
import { NumberInput } from "~/components";

export default {
  title: "NumberInput",
  component: NumberInput,
};

const Template = (args) => <NumberInput {...args}>Hallo Welt</NumberInput>;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
};
