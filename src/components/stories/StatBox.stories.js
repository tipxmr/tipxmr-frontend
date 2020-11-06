import React from "react";
import { StatBox } from "~/components";

export default {
  title: "StatBox",
  component: StatBox,
};

const Template = (args) => <StatBox {...args}>Hallo Welt</StatBox>;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
};
