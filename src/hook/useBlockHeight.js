import { useEffect, useRef, useState } from "react";
import { MoneroWalletListener } from "monero-javascript";
import useWallet from "./useWallet";

/* import { useWalletState } from "../context/wallet"; */

class BlockHeightListener extends MoneroWalletListener {
  constructor(onBlockHeight) {
    super();
    this.onBlockHeight = onBlockHeight;
  }

  onNewBlock(height) {
    this.onBlockHeight(height);
  }
}

export function useBlockHeight() {
  //const wallet = useWalletState();
  const wallet = useWallet();
  const listenerRef = useRef();
  const [blockHeight, setBlockHeight] = useState(0);

  function onBlockHeight(height) {
    setBlockHeight(height);
  }

  useEffect(() => {
    listenerRef.current = new BlockHeightListener(onBlockHeight);

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

  return blockHeight;
}

export default useBlockHeight;
