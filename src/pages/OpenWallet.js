import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";

import { useStreamer, updateHashedSeed } from "../context/streamer";
import { useWallet, openWalletFromSeed } from "../context/wallet";
import { isValidMnemoicLength, getMnemonicHash } from "../libs/monero";
import { Loading } from "../components";

// component for successful wallet unlock
function WalletUnlocked() {
  return (
    <div id="wallet-successful-opened">
      <p>Wallet unlocked 🔓</p>
      <Link to="/dashboard">
        <button className="bg-xmrorange hover:bg-xmrorange-darker text-white font-bold my-16 py-2 px-4 rounded">
          Login
        </button>
      </Link>
    </div>
  );
}

function OpenWallet() {
  const [seed, setSeed] = useState("Enter your seed");

  const [wallet, dispatch] = useWallet();

  const { isLoading } = wallet;
  const isWalletOpen = wallet.wallet && !wallet.error;

  console.log("wallet", wallet);

  const [streamerState, streamerUpdate] = useStreamer();

  // monitors the input text area of the seed
  useEffect(() => {
    // if 25 words are reached
    if (isValidMnemoicLength(seed)) {
      console.log("25 words reached");
      const hashedSeed = getMnemonicHash(seed);
      console.log("hashedSeed:", hashedSeed);
      updateHashedSeed(streamerUpdate, hashedSeed);
      openWalletFromSeed(dispatch, seed);
    }
  }, [seed]);

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
              "text-xmrgray-darker",
              "text-justify",
              "border-4",
              "border-dashed",
              "p-5",
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
          value={seed}
          style={{ resize: "none" }}
          onChange={handleChange}
          onFocus={handleFocus}
        />
        {isLoading ? <Loading text="Opening your wallet" /> : null}
        {isWalletOpen ? <WalletUnlocked /> : null}
      </div>
    </div>
  );
}

export default OpenWallet;
