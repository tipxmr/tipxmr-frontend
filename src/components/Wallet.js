import React, { useEffect, useState } from "react";
import monerojs from "../libs/monero";
import PropTypes from "prop-types";

function Wallet({ walletFunctions, walletVariables }) {
  const [percentageSynced, setPercentageSynced] = useState(0);
  useEffect(() => {
    if (walletVariables.wallet !== null) {
      console.log("Wallet File hat sich verändert.");
    }
    console.dir("Wallet state in App.js:", walletVariables.wallet);
  }, [walletVariables.wallet]);

  const mwl = new monerojs.MyWalletListener(setPercentageSynced);

  async function syncWallet() {
    monerojs.sync(walletVariables.wallet, mwl, 1);
  }

  return (
    <div>
      <button onClick={() => syncWallet()}>Start Sync</button>
      <span>Percentage: {percentageSynced}</span>
    </div>
  );
}

// Defining property types
Wallet.propTypes = {
  walletFunctions: PropTypes.object,
  walletVariables: PropTypes.object,
};

export default Wallet;
