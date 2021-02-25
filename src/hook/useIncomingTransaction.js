import { useEffect, useRef, useState } from "react";
import { MoneroWalletListener } from "monero-javascript";
import useWallet from "./useWallet";

import { useWalletState } from "../context/wallet";

class IncomingTransactionListener extends MoneroWalletListener {
  constructor(onTransaction) {
    super();
    this.onTransaction = onTransaction;
  }

  onOutputReceived(output) {
    if (
      output.state.tx.state.inTxPool &&
      output.state.tx.state.isLocked &&
      output.state.tx.state.isIncoming
    ) {
      this.onTransaction({
        subaddressIndex: output.getSubaddressIndex(),
        amount: output.getAmount(),
      });
    }
  }
}

export function useIncomingTransaction(cb) {
  const wallet = useWalletState();
  //const wallet = useWallet();
  const walletRef = useRef(wallet);
  const listenerRef = useRef();
  const callbackRef = useRef();

  function onTransaction(tx) {
    callbackRef.current(tx);
  }

  useEffect(() => {
    callbackRef.current = cb;

    return () => {
      callbackRef.current = null;
    };
  });

  useEffect(() => {
    const currentWallet = walletRef.current.wallet;
    listenerRef.current = new IncomingTransactionListener(onTransaction);
    currentWallet.addListener(listenerRef.current);
    return () => {
      currentWallet.removeListener(listenerRef.current);
      listenerRef.current = null;
    };
  }, []);

  /*  useEffect(() => {
    if (walletRef.current.wallet) {
      walletRef.current.wallet.addListener(listenerRef.current);
    }

    return () => {
      if (walletRef.current.wallet) {
        walletRef.current.wallet.removeListener(listenerRef.current);
      }
    };
  }, [walletRef.current.wallet]); */

  return [];
}

export default useIncomingTransaction;
