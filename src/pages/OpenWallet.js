import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { Loading } from "../components";
import monerojs from "../libs/monero";

// component for successful wallet unlock
function WalletUnlocked({ primaryAddress }) {
  return (
    <div id="wallet-successful-opened">
      <p>Wallet unlocked 🔓</p>
      <p>Your primary address: {primaryAddress}</p>
      <Link to="/dashboard">
        <button className="bg-xmrorange hover:bg-xmrorange-darker text-white font-bold my-16 py-2 px-4 rounded">
          Login
        </button>
      </Link>
    </div>
  );
}
WalletUnlocked.propTypes = {
  primaryAddress: PropTypes.string,
};

function OpenWallet({
  streamerConfig,
  setStreamerConfig,
  walletFunctions,
  walletVariables,
}) {
  // styles for seed text box depending on the seed validation
  const stylesTextBoxOptions = {
    valid:
      "my-10 text-xmrgray-darker text-justify border-4 border-dashed rounded border-green-600 p-5",
    invalid:
      "my-10 text-xmrgray-darker text-justify border-4 border-dashed rounded border-red-600 p-5",
  };

  const textBoxStyles = { resize: "none" };

  // states
  const [seed, setSeed] = useState("Enter your seed");
  const [isSeedValid, setIsSeedValid] = useState(false);
  const [textBoxStyle, setTextBoxStyle] = useState(
    stylesTextBoxOptions.invalid
  );
  const [isLoading, setIsLoading] = useState(false);

  // monitors the input text area of the seed
  useEffect(() => {
    // if 25 words are reached
    if (seed.split(" ").length === 25) {
      console.log("25 words reached");
      const hashedSeed = monerojs.getMnemonicHash(seed);
      setStreamerConfig({
        ...streamerConfig,
        hashedSeed: hashedSeed,
      });
      setIsLoading(true);
      monerojs
        .openWalletFromSeed(seed)
        .then(walletFunctions.setWallet)
        .then(() => setIsSeedValid(true))
        .then(() => setIsLoading(false))
        .catch(() => {
          setIsSeedValid(false);
          console.error("Failed to open wallet.");
        });
    } else {
      setIsSeedValid(false);
    }
  }, [seed]);

  useEffect(() => {
    if (walletVariables.wallet !== null) {
      monerojs
        .getPrimaryAddress(walletVariables.wallet)
        .then(walletFunctions.setPrimaryAddress);
    }
  }, [walletVariables.wallet]);

  useEffect(() => {
    console.log("Primary Address:", walletVariables.primaryAddress);
  }, [walletVariables.primaryAddress]);

  useEffect(() => {
    isSeedValid
      ? setTextBoxStyle(stylesTextBoxOptions.valid)
      : setTextBoxStyle(stylesTextBoxOptions.invalid);
  }, [isSeedValid]);

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
          className={textBoxStyle}
          id="seed"
          name="seed"
          rows="4"
          cols="50"
          value={seed}
          style={textBoxStyles}
          onChange={handleChange}
          onFocus={handleFocus}
        />
        {isLoading ? <Loading text="Opening your wallet" /> : null}
        {isSeedValid ? (
          <WalletUnlocked primaryAddress={walletVariables.primaryAddress} />
        ) : null}
      </div>
    </div>
  );
}

// Defining property types
OpenWallet.propTypes = {
  streamerConfig: PropTypes.object,
  setStreamerConfig: PropTypes.func,
  walletFunctions: PropTypes.object,
  walletVariables: PropTypes.object,
};

export default OpenWallet;
