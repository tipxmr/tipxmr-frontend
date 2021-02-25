import React from "react";
import { Donate } from "~/pages";

export default {
  title: "pages/Donate",
  component: Donate,
};

const Template = (args) => <Donate {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
};
