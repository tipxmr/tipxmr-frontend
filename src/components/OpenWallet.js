import React, { useState, useEffect } from "react";
import monerojs from "../libs/monero";

function WalletUnlocked(primaryAddress) {
  return (
    <div id="wallet-successful-opened">
      <p>Wallet unlocked 🔓</p>
      <p>Your primary address: {primaryAddress}</p>
    </div>
  );
}

function OpenWallet() {
  const stylesTextBoxOptions = {
    valid:
      "my-10 text-xmrgray-darker text-justify border-4 border-dashed border-green-600 p-5",
    invalid:
      "my-10 text-xmrgray-darker text-justify border-4 border-dashed border-red-600 p-5",
  };

  const [seed, setSeed] = useState("Enter your seed");
  const [hashedSeed, setHashedSeed] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [primaryAddress, setPrimaryAddress] = useState(null);
  const [isSeedValid, setIsSeedValid] = useState(false);
  const [textBoxStyle, setTextBoxStyle] = useState(
    stylesTextBoxOptions.invalid
  );

  useEffect(() => {
    if (seed.split(" ").length === 25) {
      console.log("25 words reached");
      monerojs
        .openWalletFromSeed(seed)
        .then(setWallet)
        .then(() => setIsSeedValid(true))
        .then(setHashedSeed(monerojs.getMnemonicHash(seed)))
        .catch(() => {
          setIsSeedValid(false);
          console.error("Failed to open wallet.");
        });
    } else {
      setIsSeedValid(false);
    }
  }, [seed]);

  useEffect(() => {
    if (wallet !== null) {
      monerojs.getPrimaryAddress(wallet).then(setPrimaryAddress);
    }
  }, [wallet]);

  useEffect(() => {
    console.log("Primary Address:", primaryAddress);
  }, [primaryAddress]);

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
          {isSeedValid ? WalletUnlocked(primaryAddress) : null}
        </div>
      </div>
    </div>
  );
}

export default OpenWallet;
