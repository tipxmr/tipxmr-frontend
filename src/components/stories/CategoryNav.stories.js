import React from "react";
import { CategoryNav } from "~/components";

export default {
  title: "dumb/CategoryNav",
  component: CategoryNav,
};

const Template = (args) => <CategoryNav {...args}>Hallo Welt</CategoryNav>;

export const Primary = Template.bind({});
Primary.args = {
  categories: ["Politics", "Gaming", "Porn", "Talk"],
};
