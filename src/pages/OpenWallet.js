import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import clsx from "clsx";
import { useWallet, openWalletFromSeed } from "../context/wallet";
import { isValidMnemoicLength, getMnemonicHash } from "../libs/monero";
import { Loading } from "../components";
import { useRecoilValue } from "recoil";
import { dispatcherState } from "../store/atom";

function OpenWallet() {
  const [seed, setSeed] = useState("");
  const dispatcher = useRecoilValue(dispatcherState);
  const [wallet, dispatch] = useWallet();

  const { isLoading } = wallet;
  const isWalletOpen = wallet.wallet && !wallet.error;

  console.log("wallet", wallet);

  // monitors the input text area of the seed
  useEffect(() => {
    // if 25 words are reached
    if (isValidMnemoicLength(seed)) {
      console.log("25 words reached");
      const hashedSeed = getMnemonicHash(seed);
      console.log("hashedSeed:", hashedSeed);
      dispatcher.updateHashedSeed(hashedSeed);
      openWalletFromSeed(dispatch, seed);
    }
  }, [dispatcher, seed]);

  function handleChange(e) {
    setSeed(e.target.value);
  }

  function handleFocus(e) {
    e.target.select();
  }

  return (
    <div className="flex flex-grow justify-center">
      <div className="my-auto text-center">
        <h2 className="text-center text-2xl">Enter your seed ⌨️</h2>
        <textarea
          className={clsx(
            [
              "my-10",
              "text-gray-200",
              "text-justify",
              "border-4",
              "border-dashed",
              "rounded",
              "p-5",
              "outline-none",
              "bg-xmrgray-darker",
            ],
            {
              "border-green-600": isWalletOpen,
              "border-red-600": !isWalletOpen,
            }
          )}
          id="seed"
          name="seed"
          rows="4"
          cols="50"
          placeholder="Open your wallet by entering your 25 seed words..."
          value={seed}
          style={{ resize: "none" }}
          onChange={handleChange}
          onFocus={handleFocus}
        />
        {isLoading ? <Loading text="Opening your wallet" /> : null}
        {isWalletOpen ? <Redirect to="/dashboard" /> : null}
      </div>
    </div>
  );
}

export default OpenWallet;
