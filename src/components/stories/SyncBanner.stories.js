import React from "react";
import { SyncBanner } from "~/components";

export default {
  title: "dumb/SyncBanner",
  component: SyncBanner,
};

const Template = (args) => <SyncBanner {...args}>Hallo Welt</SyncBanner>;

export const Synced = Template.bind({});
Synced.args = {
  synced: true,
};

export const Unsynced = Template.bind({});
Unsynced.args = {
  synced: false,
};
