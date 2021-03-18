// @ts-ignore
import { createAction } from "@reduxjs/toolkit";
import { MoneroWalletListener } from "monero-javascript";
import { Middleware } from "redux";

import monerojs from "../../libs/monero";
import { actions as balanceActions } from "../slices/balance";
import { actions as synchronisationActions } from "../slices/synchronisation";

class SynchronisationListener extends MoneroWalletListener {
  private onProgress: any;
  private onBalances: any;

  constructor(onProgress: any, onBalancesChanged: any) {
    super();
    this.onProgress = onProgress;
    this.onBalances = onBalancesChanged;
  }

  onSyncProgress(
    height: any,
    startHeight: any,
    endHeight: any,
    percentDone: any,
    message: any
  ) {
    this.onProgress(height, startHeight, endHeight, percentDone, message);
  }

  onBalancesChanged(newBalance: any, newUnlockedBalance: any) {
    const balance = parseFloat(newBalance) / Math.pow(10, 12);
    const unlockedBalance = parseFloat(newUnlockedBalance) / Math.pow(10, 12);
    this.onBalances(balance, unlockedBalance);
  }
}

export const startSynchronisation = createAction("START_SYNCHRONISATION");
export const stopSynchronisation = createAction("STOP_SYNCHRONISATION");

export const openWallet = createAction("OPEN_WALLET");
export const closeWallet = createAction("CLOSE_WALLET");

interface XmrWallet {
  addListener: (fn: SynchronisationListener | undefined) => void;
  removeListener: (fn: SynchronisationListener | undefined) => void;
  setSyncHeight: (n: number) => Promise<void>;
  startSyncing: () => Promise<void>;
  stopSyncing: () => Promise<void>;
}

const walletMiddleware: Middleware = (store) => {
  let wallet: XmrWallet;
  let listener: SynchronisationListener | undefined;

  function onProgress(
    height: number,
    startHeight: number,
    endHeight: number,
    percentDone: number,
    message: any
  ) {
    const percentage = Math.floor(percentDone * 100);

    if (percentage) {
      store.dispatch(synchronisationActions.setProgress(percentage));
    }

    if (percentDone === 1) {
      store.dispatch(synchronisationActions.setIsDone(true));
    }
  }

  function onBalancesChanged(newBalance: any, newUnlockedBalance: any) {
    store.dispatch(balanceActions.setTotal(newBalance));
    store.dispatch(balanceActions.setUnlocked(newUnlockedBalance));
  }

  if (listener === undefined) {
    listener = new SynchronisationListener(onProgress, onBalancesChanged);
  }

  return (next) => async (action) => {
    if (action.type === startSynchronisation.type) {
      await wallet?.setSyncHeight(store.getState().restoreHeight);
      await wallet?.startSyncing();
      store.dispatch(synchronisationActions.setIsActive(true));
      store.dispatch(synchronisationActions.setIsDone(false));
    }

    if (action.type === stopSynchronisation.type) {
      store.dispatch(synchronisationActions.setIsActive(false));
      await wallet?.stopSyncing();
    }

    if (action.type === openWallet.type) {
      wallet?.addListener(listener);
    }

    if (action.type === closeWallet.type) {
      wallet?.removeListener(listener);
    }

    return next(action);
  };
};

export default walletMiddleware;
