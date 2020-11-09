import React from "react";
import { Loading } from "~/components";

export default {
  title: "dumb/Loading",
  component: Loading,
};

const Template = (args) => <Loading {...args}>Hallo Welt</Loading>;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
};
