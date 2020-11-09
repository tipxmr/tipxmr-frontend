import React from "react";
import { StatBox } from "~/components";

export default {
  title: "dumb/StatBox",
  component: StatBox,
};

const Template = (args) => <StatBox {...args}></StatBox>;

export const Primary = Template.bind({});
Primary.args = {
  boxTitle: "Box Title",
  boxStat: "Box Stat",
};
