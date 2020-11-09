import React from "react";
import { Faqblock } from "~/components";

export default {
  title: "dumb/FAQblock",
  component: Faqblock,
};

const Template = (args) => (
  <Faqblock {...args}>
    Here is an intersting and insightful answer to the question posed above
  </Faqblock>
);

export const Example = Template.bind({});
Example.args = {
  primary: true,
  question:
    "Is Monero really private to use or will the IRS come and get my ass?",
};
