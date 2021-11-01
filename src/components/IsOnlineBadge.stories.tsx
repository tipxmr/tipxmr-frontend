import { Meta } from "@storybook/react";

import IsOnlineBadge from "./IsOnlineBadge";

export default {
  component: IsOnlineBadge,
  title: "Components/IsOnlineBadge",
} as Meta;

export const Online: React.VFC<{}> = () => <IsOnlineBadge isOnline />;
export const Offline: React.VFC<{}> = () => <IsOnlineBadge isOnline={false} />;
