import React from "react";
import { Counter } from "~/components";

export default {
  title: "Counter",
  component: Counter,
};

const Template = (args) => <Counter {...args}>Hallo Welt</Counter>;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
};
