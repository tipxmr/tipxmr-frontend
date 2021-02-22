import { hot } from "react-hot-loader/root";
import React, { StrictMode } from "react";
import ReactDOM from "react-dom";

import './styles/tailwind.css';

import App from "./App";

import { StreamerProvider } from "./context/streamer";
import { RecoilRoot } from "recoil";
import { WalletProvider } from "./context/wallet";

const root = document.getElementById("root");

const HotApp = hot(App);

ReactDOM.render(
  <StrictMode>
    <WalletProvider>
      <StreamerProvider>
        <RecoilRoot>
          <HotApp />
        </RecoilRoot>
      </StreamerProvider>
    </WalletProvider>
  </StrictMode>,
  root
);
