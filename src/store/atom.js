import { atom } from "recoil";

export const streamerState = atom({
  key: "streamer",
  default: {},
});

export const walletState = atom({
  key: "wallet",
  default: {},
});

export const dispatcherState = atom({
  key: "dispatcher",
  default: undefined,
});
