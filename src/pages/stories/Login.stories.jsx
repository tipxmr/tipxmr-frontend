import React from "react";
import { Login } from "~/pages";

export default {
  title: "pages/Login",
  component: Login,
};

const Template = (args) => <Login {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
};
