import React from "react";
import { Logout } from "~/pages";

export default {
  title: "pages/Logout",
  component: Logout,
};

const Template = (args) => <Logout {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
};
