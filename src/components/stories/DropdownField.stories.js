import React from "react";
import { DropdownField } from "~/components";

export default {
  title: "DropdownField",
  component: DropdownField,
};

const Template = (args) => <DropdownField {...args}>Hallo Welt</DropdownField>;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
};
