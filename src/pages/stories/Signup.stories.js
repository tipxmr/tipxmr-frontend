import React from "react";
import { Signup } from "~/pages";

export default {
  title: "pages/Signup",
  component: Signup,
};

const Template = (args) => <Signup {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
};
