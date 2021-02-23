import React from "react";
import { Header } from "~/components";
import { StreamerProvider } from "~/context/streamer";

export default {
  title: "dumb/Header",
  component: Header,
  decorators: [
    (Story) => (
      <StreamerProvider>
        <Story />
      </StreamerProvider>
    ),
  ],
};

const Template = (args) => <Header {...args}>Hallo Welt</Header>;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
};
