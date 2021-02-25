import React from "react";
import { CheckboxField } from "~/components";

export default {
  title: "dumb/CheckboxField",
  component: CheckboxField,
};

const Template = (args) => <CheckboxField {...args}>Hallo Welt</CheckboxField>;

export const Checked = Template.bind({});
Checked.args = {
  labelName: "CheckboxField",
  name: "CheckboxField",
  defaultChecked: true,
  register: {},
};

export const Unchecked = Template.bind({});
Unchecked.args = {
  labelName: "CheckboxField",
  name: "CheckboxField",
  defaultChecked: false,
  register: {},
};
