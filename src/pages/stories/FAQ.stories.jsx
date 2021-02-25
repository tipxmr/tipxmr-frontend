import React from "react";
import { FAQ } from "~/pages";

export default {
  title: "pages/FAQ",
  component: FAQ,
};

const Template = (args) => <FAQ {...args}>Hallo Welt</FAQ>;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
};
