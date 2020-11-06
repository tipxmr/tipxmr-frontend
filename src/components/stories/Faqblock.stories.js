import React from "react";
import { Faqblock } from "~/components";

export default {
  title: "Faqblock",
  component: Faqblock,
};

const Template = (args) => <Faqblock {...args}>Hallo Welt</Faqblock>;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
};
