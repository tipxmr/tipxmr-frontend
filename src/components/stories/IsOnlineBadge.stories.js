import React from "react";
import { IsOnlineBadge } from "~/components";

export default {
  title: "IsOnlineBadge",
  component: IsOnlineBadge,
};

const Template = (args) => <IsOnlineBadge {...args}>Hallo Welt</IsOnlineBadge>;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
};
