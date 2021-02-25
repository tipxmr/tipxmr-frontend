import React from "react";
import { Button } from "~/components";

export default {
  title: "dumb/Button",
  component: Button,
  argTypes: { onClick: { action: "clicked" } },
  parameters: {
    actions: {
      handles: ["click"],
    },
  },
};

const Template = (args) => <Button {...args}>Button Text</Button>;

export const Default = Template.bind({});
Default.args = {
  disabled: false,
  loading: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  loading: false,
};

export const DisabledLoading = Template.bind({});
DisabledLoading.args = {
  disabled: true,
  loading: true,
};

export const Loading = Template.bind({});
Loading.args = {
  disabled: false,
  loading: true,
};
