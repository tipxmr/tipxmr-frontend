import React from "react";
import { CreateWallet } from "~/pages";

export default {
  title: "pages/CreateWallet",
  component: CreateWallet,
};

const Template = (args) => <CreateWallet {...args}></CreateWallet>;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
};
