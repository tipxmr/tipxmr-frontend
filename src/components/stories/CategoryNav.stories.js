import React from "react";
import { CategoryNav } from "~/components";

export default {
  title: "CategoryNav",
  component: CategoryNav,
};

const Template = (args) => <CategoryNav {...args}>Hallo Welt</CategoryNav>;

export const Primary = Template.bind({});
Primary.args = {
  categories: ["Test1", "Test2"],
};
