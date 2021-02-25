import React from "react";
import { Footer } from "~/components";

export default {
  title: "dumb/Footer",
  component: Footer,
};

const Template = (args) => <Footer {...args}>Hallo Welt</Footer>;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
};
