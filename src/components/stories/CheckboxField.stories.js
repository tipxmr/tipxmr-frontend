import React from "react";
import { CheckboxField } from "~/components";

export default {
  title: "CheckboxField",
  component: CheckboxField,
};

const Template = (args) => <CheckboxField {...args}>Hallo Welt</CheckboxField>;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
};
