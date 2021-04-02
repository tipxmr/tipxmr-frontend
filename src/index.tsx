/// <reference types="@welldone-software/why-did-you-render" />
import "./wdyr"

import { hot } from "react-hot-loader/root";
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";

import './styles/index.less';
import './styles/tailwind.css';

import App from "./App";

import { StreamerProvider } from "./context/streamer";
import { WalletProvider } from "./context/wallet";

const root = document.getElementById("root");

const HotApp = hot(App);
HotApp.whyDidYouRender = true;

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
    <WalletProvider>
      <StreamerProvider>
          <HotApp />
      </StreamerProvider>
    </WalletProvider>
    </Provider>
  </StrictMode>,
  root
);
