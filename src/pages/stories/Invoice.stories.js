import React from "react";
import { Invoice } from "~/pages";

export default {
  title: "pages/Invoice",
  component: Invoice,
};

const Template = (args) => <Invoice {...args}>Working</Invoice>;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
};
