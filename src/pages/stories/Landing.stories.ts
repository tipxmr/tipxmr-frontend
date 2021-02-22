import React from "react";
import { Landing } from "~/pages";

export default {
  title: "pages/Landing",
  component: Landing,
};

const Template = (args) => <Landing {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
};
