import React from "react";
import { NotFound404 } from "~/pages";

export default {
  title: "pages/NotFound404",
  component: NotFound404,
};

const Template = (args) => <NotFound404 {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
};
