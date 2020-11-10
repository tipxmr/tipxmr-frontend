import React from "react";
import { StreamerCard } from "~/components";

export default {
  title: "dumb/StreamerCard",
  component: StreamerCard,
};

const Template = (args) => <StreamerCard {...args}>Hallo Welt</StreamerCard>;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  streamer: {
    displayName: "AlexAnarcho",
    userName: "alexanarcho",
    stream: {
      description: "Ich bin ein guter Streamer",
      url: "https://alexanarcho.net",
      platform: "twitch",
      language: "German",
    },
  },
};
