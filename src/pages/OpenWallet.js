import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import clsx from "clsx";
import { useWallet, openFromSeed } from "../context/wallet";
import { isValidMnemoicLength, getMnemonicHash } from "../libs/monero";
import { Loading } from "../components";
import { useRecoilValue } from "recoil";
import { dispatcherState } from "../store/atom";
import { isNil } from "ramda";
import socket_streamer from "../libs/socket_streamer";

function OpenWallet() {
  const [seed, setSeed] = useState("");
  const dispatcher = useRecoilValue(dispatcherState);
  const [wallet, dispatch] = useWallet();
  const { isPending, isResolved } = wallet.status;
  const isWalletOpen = !isNil(wallet.wallet) && isNil(wallet.error);

  console.log("wallet", wallet);
  console.log("isWalletOpen", isWalletOpen);
  // monitors the input text area of the seed
  useEffect(() => {
    // if 25 words are reached
    if (isValidMnemoicLength(seed) && !isWalletOpen && !isPending) {
      console.log("25 words reached");
      const hashedSeed = getMnemonicHash(seed);
      console.log("hashedSeed:", hashedSeed);
      // Login procedure
      socket_streamer.login(hashedSeed, null, (response) => {
        console.log("CB response:", response);
        if (response.type === "success") {
          dispatcher.updateStreamer(response.data);
        } else {
          // 2 cases: userName taken or no userName set
        }
      });

      dispatch(openFromSeed(seed));
    }
  }, [dispatcher, isWalletOpen, isPending, dispatch, seed]);

  function handleChange(e) {
    setSeed(e.target.value);
  }

  function handleFocus(e) {
    e.target.select();
  }

  if (isWalletOpen && isResolved) {
    console.log("Redirected");
    return <Redirect to="/dashboard" />;
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
        {isPending ? <Loading text="Opening your wallet" /> : null}
      </div>
    </div>
  );
}

export default OpenWallet;
