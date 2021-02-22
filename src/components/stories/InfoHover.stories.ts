import React from "react";
import { InfoHover } from "~/components";

export default {
  title: "dumb/InfoHover",
  component: InfoHover,
};

const Template = (args) => <InfoHover {...args}>Hallo Welt</InfoHover>;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
};
