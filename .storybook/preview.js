import React from "react";
import "~/styles.css";
import { BrowserRouter as Router } from "react-router-dom";
import { WalletProvider } from "~/context/wallet";
import { StreamerProvider } from "~/context/streamer";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};

export const decorators = [
  (Story) => (
    <WalletProvider>
      <StreamerProvider>
        <Router>
          <Story />
        </Router>
      </StreamerProvider>
    </WalletProvider>
  ),
];
