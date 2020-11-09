import React from "react";
import { Categories } from "~/pages";

export default {
  title: "pages/Categories",
  component: Categories,
};

const Template = (args) => <Categories {...args}>Hallo Welt</Categories>;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
};
