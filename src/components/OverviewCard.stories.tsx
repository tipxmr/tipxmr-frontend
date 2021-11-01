import { Meta } from "@storybook/react";


import OverviewCard from "./OverviewCard";
import { streamerCard } from "../data/LandingData";

export default {
  component: OverviewCard,
  title: "Components/OverviewCard",
} as Meta;

export const Default: React.VFC<{}> = () => (
  <OverviewCard
    title={streamerCard.title}
    buttonLink={streamerCard.buttonLink}
    buttonCta={streamerCard.buttonCta}
    bulletpoints={streamerCard.bulletpoints}
  />
);
