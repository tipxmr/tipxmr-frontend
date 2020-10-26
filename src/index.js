import React, { StrictMode } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import App from "./App";

import { StreamerProvider } from "./context/streamer";
import { RecoilRoot } from "recoil";

const root = document.getElementById("root");

ReactDOM.render(
  <StrictMode>
    <StreamerProvider>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </StreamerProvider>
  </StrictMode>,
  root
);
