import React, { StrictMode } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import App from "./App";

import { StreamerProvider } from "./context/streamer";
import { RecoilRoot } from "recoil";
import { WalletProvider } from "./context/wallet";

const root = document.getElementById("root");

ReactDOM.render(
  <StrictMode>
    <WalletProvider>
      <StreamerProvider>
        <RecoilRoot>
          <App />
        </RecoilRoot>
      </StreamerProvider>
    </WalletProvider>
  </StrictMode>,
  root
);
