import React from "react";
import "~/styles.css";
import { BrowserRouter as Router } from "react-router-dom";
import { WalletProvider } from "~/context/wallet";
import { StreamerProvider } from "~/context/streamer";
import { RecoilRoot } from "recoil";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};

export const decorators = [
  (Story) => (
    <div className="bg-xmrgray">
      <WalletProvider>
        <StreamerProvider>
          <RecoilRoot>
            <Router>
              <Story />
            </Router>
          </RecoilRoot>
        </StreamerProvider>
      </WalletProvider>
    </div>
  ),
];
