import React from "react";
import { StreamerCard } from "~/components";

export default {
  title: "StreamerCard",
  component: StreamerCard,
};

const Template = (args) => <StreamerCard {...args}>Hallo Welt</StreamerCard>;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
};
