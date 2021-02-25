import React from "react";
import { Progressbar } from "~/components";

export default {
  title: "dumb/Progressbar",
  component: Progressbar,
};

const Template = (args) => <Progressbar {...args}>Hallo Welt</Progressbar>;

export const Done = Template.bind({});
Done.args = {
  isActive: true,
  isDone: true,
  percentage: 100,
};

export const Active = Template.bind({});
Active.args = {
  isActive: true,
  isDone: false,
  percentage: 42,
};

export const Inactive = Template.bind({});
Inactive.args = {
  isActive: false,
  isDone: false,
};
