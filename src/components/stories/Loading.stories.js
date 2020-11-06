import React from "react";
import { Loading } from "~/components";

export default {
  title: "Loading",
  component: Loading,
};

const Template = (args) => <Loading {...args}>Hallo Welt</Loading>;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
};
