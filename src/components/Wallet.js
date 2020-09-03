import React, { useEffect, useState } from "react";
import monerojs from "../libs/monero";
import PropTypes from "prop-types";

function Wallet({ walletFunctions, walletVariables }) {
  const [percentageSynced, setPercentageSynced] = useState(0);

  const mwl = new monerojs.MyWalletListener(setPercentageSynced);

  async function syncWallet() {
    monerojs
      .sync(walletVariables.wallet, mwl, 1)
      .catch((err) => console.error(err));
  }

  return (
    <div className="flex flex-grow justify-center">
      <div className="text-center my-auto">
        <button
          onClick={() => syncWallet()}
          className="bg-xmrorange hover:bg-xmrorange-darker text-white font-bold my-16 py-2 px-4 rounded"
        >
          Start Sync
        </button>
        <br />
        <span>Percentage: {percentageSynced}</span>
      </div>
    </div>
  );
}

// Defining property types
Wallet.propTypes = {
  walletFunctions: PropTypes.object,
  walletVariables: PropTypes.object,
};

export default Wallet;
