import React from "react";
import { Nav } from "~/components";

export default {
  title: "Nav",
  component: Nav,
};

const Template = (args) => <Nav {...args}>Hallo Welt</Nav>;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
};
