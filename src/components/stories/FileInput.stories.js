import React from "react";
import { FileInput } from "~/components";

export default {
  title: "FileInput",
  component: FileInput,
};

const Template = (args) => <FileInput {...args}>Hallo Welt</FileInput>;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
};
