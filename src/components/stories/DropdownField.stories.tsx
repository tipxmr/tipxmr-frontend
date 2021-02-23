import React from "react";
import { DropdownField } from "~/components";

export default {
  title: "dumb/DropdownField",
  component: DropdownField,
};

const Template = (args) => <DropdownField {...args}>Hallo Welt</DropdownField>;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  name: "DropdownField",
  options: ["Option1", "Option2", "Option3"],
  labelText: "DropdownField",
  selected: "Option1",
  register: {},
  errors: {},
};
