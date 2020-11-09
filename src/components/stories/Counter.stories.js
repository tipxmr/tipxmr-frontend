import React from "react";
import { Counter } from "~/components";

export default {
  title: "dumb/Counter",
  component: Counter,
};

const Template = (args) => <Counter {...args}>Hallo Welt</Counter>;

export const Primary = Template.bind({});
Primary.args = {
  count: 1,
};
