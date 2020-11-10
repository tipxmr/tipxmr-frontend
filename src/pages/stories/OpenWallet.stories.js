import React from "react";
import { OpenWallet } from "~/pages";

export default {
  title: "pages/OpenWallet",
  component: OpenWallet,
};

const Template = (args) => <OpenWallet {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
};
