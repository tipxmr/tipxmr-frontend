import { atom } from "recoil";

export const streamerState = atom({
  key: "streamer",
  default: {},
});

export const walletState = atom({
  key: "wallet",
  default: null,
});

export const restoreHeightState = atom({
  key: "restoreHeight",
  default: 0,
});

export const dispatcherState = atom({
  key: "dispatcher",
  default: undefined,
});

//////////////////////////////////
///////////// Sync ///////////////
//////////////////////////////////

export const syncIsActiveState = atom({ key: "syncIsActive", default: false });
export const syncIsDoneState = atom({ key: "syncIsDone", default: false });
export const syncProgressState = atom({ key: "syncProgress", default: 0 });
export const balanceState = atom({ key: "balance", default: 0 });
export const unlockedBalanceState = atom({
  key: "unlockedBalance",
  default: 0,
});
