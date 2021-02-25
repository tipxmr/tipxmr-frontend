import React from "react";
import { Start } from "~/pages";

export default {
  title: "pages/Start",
  component: Start,
};

const Template = (args) => <Start {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
};
