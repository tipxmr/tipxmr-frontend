import React from "react";
import { Table } from "~/components";

export default {
  title: "defect/Table",
  component: Table,
};

const Template = (args) => <Table {...args}>Hallo Welt</Table>;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  headers: [],
  data: [],
};
