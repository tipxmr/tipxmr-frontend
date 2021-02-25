import React from "react";
import { Disclaimer } from "~/pages";

export default {
  title: "pages/Disclaimer",
  component: Disclaimer,
};

const Template = (args) => <Disclaimer {...args}>Hallo Welt</Disclaimer>;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
};
