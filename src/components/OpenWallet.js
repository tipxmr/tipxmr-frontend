import React, { useState, useEffect } from "react";
import monerojs from "../libs/monero";

function OpenWallet() {
  const [seed, setSeed] = useState("Enter your seed");
  const [wallet, setWallet] = useState(null);
  const [primaryAddress, setPrimaryAddress] = useState(null);
  const [isSeedValid, setIsSeedValid] = useState(false);

  useEffect(() => {
    if (seed.split(" ").length === 25) {
      console.log("25 words reached");
      monerojs.openWalletFromSeed(seed).then(setWallet);
    }
  }, [seed]);

  useEffect(() => {
    if (wallet !== null) {
      monerojs
        .getPrimaryAddress(wallet)
        .then((address) => {
          setPrimaryAddress(address);
          return address;
        })
        .then((address) => console.log("Primary Address:", address));
    }
  }, [wallet]);

  return (
    <div>
      <div className="w-1/2 mx-auto mt-10">
        <div className="my-auto text-center">
          <h2 className="text-center text-2xl">Enter your seed ⌨️</h2>
          <textarea
            className="mt-10 text-xmrgray-darker text-justify border-4 border-dashed border-xmrorange-lighter p-5"
            id="seed"
            name="seed"
            rows="4"
            cols="50"
            value={seed}
            style={{ resize: "none" }}
            onChange={(e) => setSeed(e.target.value)}
            onFocus={(e) => e.target.select()}
          />
        </div>
      </div>
    </div>
  );
}

export default OpenWallet;
