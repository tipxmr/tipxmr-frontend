import React from "react";
import { Nav } from "~/components";
import { StreamerProvider } from "~/context/streamer";

export default {
  title: "dumb/Nav",
  component: Nav,
  decorators: [
    (Story) => (
      <StreamerProvider>
        <Story />
      </StreamerProvider>
    ),
  ],
};

const Template = (args) => <Nav {...args}></Nav>;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
};
