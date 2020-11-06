import React from "react";
import { Progressbar } from "~/components";

export default {
  title: "Progressbar",
  component: Progressbar,
};

const Template = (args) => <Progressbar {...args}>Hallo Welt</Progressbar>;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
};
