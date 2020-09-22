import { useEffect, useRef, useState } from "react";
import { MoneroWalletListener } from "monero-javascript";

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
    listenerRef.current = new IncomingTransactionListener(onTransaction);

    return () => {
      listenerRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (wallet.wallet) {
      wallet.wallet.addListener(listenerRef.current);
    }

    return () => {
      if (wallet.wallet) {
        wallet.wallet.removeListener(listenerRef.current);
      }
    };
  }, [wallet.wallet]);

  return [];
}

export default useIncomingTransaction;
