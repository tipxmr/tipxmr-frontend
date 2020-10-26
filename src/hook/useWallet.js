import { useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { dispatcherState, walletState } from "../store/atom";
import monerojs from "../libs/monero";

function useWallet() {
  const dispatcher = useRecoilValue(dispatcherState);
  //const [wallet, setWallet] = useRecoilState(walletState);
  const [wallet, setWallet] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  console.log("useWallet wallet:", wallet);
  function openFromSeed(seed) {
    setIsLoading(true);
    monerojs
      .openWalletFromSeed(seed)
      .then(setWallet)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }

  function create(language) {
    setIsLoading(true);
    monerojs
      .createWallet(language)
      .then(setWallet)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }

  function close() {
    setWallet(null);
  }

  return { openFromSeed, create, close, wallet, error, isLoading };
}
export default useWallet;
