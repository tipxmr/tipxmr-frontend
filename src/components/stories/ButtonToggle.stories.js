import React from "react";
import { ButtonToggle } from "~/components";

export default {
  title: "dumb/ButtonToggle",
  component: ButtonToggle,
  parameters: {
    actions: {
      handles: ["click"],
    },
  },
};

const Template = (args) => <ButtonToggle {...args} />;

export const Default = Template.bind({});
Default.args = {
  ButtonTextLeft: "monthly",
  ButtonTextRight: "yearly",
};
