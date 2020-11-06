import React from "react";
import { Button } from "~/components";

export default {
  title: "Button",
  component: Button,
};

const Template = (args) => <Button {...args}>Hallo Welt</Button>;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
};
