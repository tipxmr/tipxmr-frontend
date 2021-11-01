import { Meta } from "@storybook/react";

import LanguageSelector from "./LanguageSelector";

export default {
  component: LanguageSelector,
  title: "Components/LanguageSelector",
} as Meta;

export const Default: React.VFC<{}> = () => <LanguageSelector language={"English"} />;
