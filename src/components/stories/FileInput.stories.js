import React from "react";
import { FileInput } from "~/components";

export default {
  title: "dumb/FileInput",
  component: FileInput,
};

const Template = (args) => <FileInput {...args}>Hallo Welt</FileInput>;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  labelName: "FileInput",
  name: "FileInput",
  currenFile: {},
  accept: "Accepted",
  maxFilesize: 10000,
  register: {},
  errors: {},
};
