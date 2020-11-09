import React from "react";
import { Dashboard } from "~/pages";

export default {
  title: "pages/Dashboard",
  component: Dashboard,
};

const Template = (args) => <Dashboard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
};
