import React from "react";
import { SyncBanner } from "~/components";

export default {
  title: "SyncBanner",
  component: SyncBanner,
};

const Template = (args) => <SyncBanner {...args}>Hallo Welt</SyncBanner>;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
};
