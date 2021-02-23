import React from "react";
import { CategoryCard } from "~/components";

export default {
  title: "dumb/CategoryCard",
  component: CategoryCard,
};

const Template = (args) => <CategoryCard {...args}>Hallo Welt</CategoryCard>;

export const AlexAnarcho = Template.bind({});
AlexAnarcho.args = {
  primary: true,
  name: "AlexAnarcho",
  numStreamers: 1,
  languages: ["German"],
  pictureLink: "https:i.imgur.com/PW3XO3u.jpg",
};
