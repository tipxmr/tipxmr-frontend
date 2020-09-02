import React, { useState, useEffect } from "react";
import monerojs from "../libs/monero";
import PropTypes from "prop-types";

// component for successful wallet unlock
function WalletUnlocked(primaryAddress) {
  return (
    <div id="wallet-successful-opened">
      <p>Wallet unlocked 🔓</p>
      <p>Your primary address: {primaryAddress}</p>
    </div>
  );
}

function OpenWallet({ walletFunctions, walletVariables }) {
  // styles for seed text box depending on the seed validation
  const stylesTextBoxOptions = {
    valid:
      "my-10 text-xmrgray-darker text-justify border-4 border-dashed border-green-600 p-5",
    invalid:
      "my-10 text-xmrgray-darker text-justify border-4 border-dashed border-red-600 p-5",
  };

  // states
  const [seed, setSeed] = useState("Enter your seed");
  const [isSeedValid, setIsSeedValid] = useState(false);
  const [textBoxStyle, setTextBoxStyle] = useState(
    stylesTextBoxOptions.invalid
  );

  // monitors the input text area of the seed
  useEffect(() => {
    // if 25 words are reached
    if (seed.split(" ").length === 25) {
      console.log("25 words reached");
      monerojs
        .openWalletFromSeed(seed)
        .then(walletFunctions.setWallet)
        .then(() => setIsSeedValid(true))
        .then(walletFunctions.setHashedSeed(monerojs.getMnemonicHash(seed)))
        .catch(() => {
          setIsSeedValid(false);
          console.error("Failed to open wallet.");
        });
    } else {
      setIsSeedValid(false);
    }
  }, [seed]);

  useEffect(() => {
    console.log("Hashed Seed:", walletVariables.hashedSeed);
  }, [walletVariables.hashedSeed]);

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

  return (
    <div>
      <div className="w-1/2 mx-auto mt-10">
        <div className="my-auto text-center">
          <h2 className="text-center text-2xl">Enter your seed ⌨️</h2>
          <textarea
            className={textBoxStyle}
            id="seed"
            name="seed"
            rows="4"
            cols="50"
            value={seed}
            style={{ resize: "none" }}
            onChange={(e) => setSeed(e.target.value)}
            onFocus={(e) => e.target.select()}
          />
          {isSeedValid ? WalletUnlocked(walletVariables.primaryAddress) : null}
        </div>
      </div>
    </div>
  );
}

// Defining property types
OpenWallet.propTypes = {
  walletFunctions: PropTypes.object,
  walletVariables: PropTypes.object,
};

export default OpenWallet;
