import React, { useEffect } from "react";
import monerojs from "../libs/monero";
import PropTypes from "prop-types";

function Wallet({ walletFunctions, walletVariables }) {
  useEffect(() => {
    if (walletVariables.wallet !== null) {
      console.log("Wallet File hat sich verändert.");
    }
    console.dir("Wallet state in App.js:", walletVariables.wallet);
  }, [walletVariables.allet]);

  async function syncWallet() {
    // synchronize with progress notifications
    await walletVariables.wallet.sync(
      new (class extends monerojs.MoneroWalletListener {
        onSyncProgress(height, startHeight, endHeight, percentDone, message) {
          console.log(message);
        }
      })()
    );
  }

  return (
    <div>
      <button onClick={() => syncWallet()}>Start Sync</button>
    </div>
  );
}

// Defining property types
Wallet.propTypes = {
  walletFunctions: PropTypes.object,
  walletVariables: PropTypes.object,
};

export default Wallet;
