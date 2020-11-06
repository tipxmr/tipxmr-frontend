import React from "react";

import { CategoryCard } from "~/components";

export default {
  title: "CategoryCard",
  component: CategoryCard,
};

const Template = (args) => <CategoryCard {...args}>Hallo Welt</CategoryCard>;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
};
