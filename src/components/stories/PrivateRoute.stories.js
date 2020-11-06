import React from "react";
import { PrivateRoute } from "~/components";

export default {
  title: "PrivateRoute",
  component: PrivateRoute,
};

const Template = (args) => <PrivateRoute {...args}>Hallo Welt</PrivateRoute>;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
};
