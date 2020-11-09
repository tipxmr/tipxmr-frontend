import React from "react";
import { IsOnlineBadge } from "~/components";

export default {
  title: "dumb/IsOnlineBadge",
  component: IsOnlineBadge,
};

const Template = (args) => <IsOnlineBadge {...args}>Hallo Welt</IsOnlineBadge>;

export const Offline = Template.bind({});
Offline.args = {
  isOnline: false,
};

export const Online = Template.bind({});
Online.args = {
  isOnline: true,
};
