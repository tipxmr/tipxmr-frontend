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

  function handleWallet(w) {
    setIsLoading(false);
    setWallet(w);
  }

  function handleError(e) {
    setIsLoading(false);
    setError(e);
  }

  function handleResult(result) {
    result.then(handleWallet).catch(handleError);
  }

  function openFromSeed(seed) {
    setIsLoading(true);
    handleResult(monerojs.openWalletFromSeed(seed));
  }

  function create(language) {
    setIsLoading(true);
    handleResult(monerojs.createWallet(language));
  }

  function close() {
    setWallet(null);
  }

  return { openFromSeed, create, close, wallet, error, isLoading };
}
export default useWallet;
