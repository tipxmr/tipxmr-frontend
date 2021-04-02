// @ts-ignore
import { createAction } from "@reduxjs/toolkit";
import { MoneroWalletListener } from "monero-javascript";
import { Middleware } from "redux";

import monerojs from "../../libs/monero";
import { actions as balanceActions } from "../slices/balance";
import { actions as synchronisationActions } from "../slices/synchronisation";
import { actions as walletActions } from "../slices/wallet";

class SynchronisationListener extends MoneroWalletListener {
  private onProgress: any;
  private onBalances: any;

  constructor(onProgress: any, onBalancesChanged: any) {
    super();
    this.onProgress = onProgress;
    this.onBalances = onBalancesChanged;
    console.log("new SynchronisationListener()");
  }

  onSyncProgress(
    height: any,
    startHeight: any,
    endHeight: any,
    percentDone: any,
    message: any
  ) {
    // console.log("onSyncProgress", percentDone);
    this.onProgress(height, startHeight, endHeight, percentDone, message);
  }

  onBalancesChanged(newBalance: any, newUnlockedBalance: any) {
    // console.log("onBalancesChanged", newBalance);
    const balance = parseFloat(newBalance) / Math.pow(10, 12);
    const unlockedBalance = parseFloat(newUnlockedBalance) / Math.pow(10, 12);
    this.onBalances(balance, unlockedBalance);
  }
}

export const startSynchronisation = createAction("START_SYNCHRONISATION");
export const stopSynchronisation = createAction("STOP_SYNCHRONISATION");

export const openWallet = createAction("OPEN_WALLET");
export const closeWallet = createAction("CLOSE_WALLET");

// export const createSubaddress = createAction("CREATE_SUBADDRESS");

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
    // console.log("onProgress", percentDone);
    const percentage = Math.floor(percentDone * 100);

    if (percentage) {
      if (store.getState().synchronisation.progress !== percentage) {
        store.dispatch(synchronisationActions.setProgress(percentage));
      }
    }

    if (percentDone === 1) {
      store.dispatch(synchronisationActions.setIsDone(true));
    }
  }

  function onBalancesChanged(newBalance: any, newUnlockedBalance: any) {
    // console.log("onBalancesChanged", newBalance);
    store.dispatch(balanceActions.setTotal(newBalance));
    store.dispatch(balanceActions.setUnlocked(newUnlockedBalance));
  }

  if (listener === undefined) {
    listener = new SynchronisationListener(onProgress, onBalancesChanged);
  }

  return (next) => async (action) => {
    if (action.type === startSynchronisation.type) {
      // console.log({ action, wallet, listener });
      wallet?.addListener(listener);
      // console.log("wallet", wallet);
      await wallet?.setSyncHeight(store.getState().restoreHeight);
      // console.log("wallet", wallet);
      await wallet?.startSyncing();
      // console.log("wallet", wallet);
      store.dispatch(synchronisationActions.setIsActive(true));
      store.dispatch(synchronisationActions.setIsDone(false));
    }

    if (action.type === stopSynchronisation.type) {
      store.dispatch(synchronisationActions.setIsActive(false));
      await wallet?.stopSyncing();
      wallet?.removeListener(listener);
    }

    if (action.type === openWallet.type) {
      // console.log(action);
      // wallet?.addListener(listener);
      monerojs
        .openWalletFromSeed(store.getState().wallet.seed)
        .then((newWallet) => {
          // console.log({ wallet, newWallet });
          wallet = newWallet;
          // console.log({ wallet, newWallet });
          store.dispatch(walletActions.setIsOpen(true))
        })
        .catch((error) => console.error(error));
    }

    if (action.type === closeWallet.type) {
      // wallet?.removeListener(listener);
    }

    // if (action.type === createSubaddress.type) {
    //   monerojs.createSubaddress(wallet).then(
    //     subaddress => {
    //       store.dispatch(walletActions.setSubaddress(subaddress))
    //     }
    //   )
    // }

    return next(action);
  };
};

export default walletMiddleware;
