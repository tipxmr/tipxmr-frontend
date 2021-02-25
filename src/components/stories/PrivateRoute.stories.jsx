import React from "react";
import { PrivateRoute } from "~/components";
import { WalletProvider } from "~/context/wallet";

export default {
  title: "defect/PrivateRoute",
  component: PrivateRoute,
  decorators: [
    (Story) => (
      <WalletProvider>
        <Story />
      </WalletProvider>
    ),
  ],
};

const Template = (args) => <PrivateRoute {...args}>Hallo Welt</PrivateRoute>;

// Not yet functioning
export const Primary = Template.bind({});
Primary.args = {
  primary: true,
};
