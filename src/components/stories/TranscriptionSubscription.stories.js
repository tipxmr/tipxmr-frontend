import React from "react";
import { TransactionSubscription } from "~/components";

export default {
  title: "TransactionSubscription",
  component: TransactionSubscription,
};

const Template = (args) => (
  <TransactionSubscription {...args}>Hallo Welt</TransactionSubscription>
);

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
};
