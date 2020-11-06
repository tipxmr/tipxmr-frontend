import React from "react";
import { Header } from "~/components";

export default {
  title: "Header",
  component: Header,
};

const Template = (args) => <Header {...args}>Hallo Welt</Header>;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
};
