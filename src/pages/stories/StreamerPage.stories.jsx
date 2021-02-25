import React from "react";
import { StreamerPage } from "~/pages";

export default {
  title: "pages/StreamerPage",
  component: StreamerPage,
};

const Template = (args) => <StreamerPage {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
};
