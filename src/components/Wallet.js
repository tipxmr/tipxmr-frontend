import React from "react";
import monerojs from "../libs/monero";
import PropTypes, { func } from "prop-types";

function Wallet({ walletFunctions, walletVariables }) {
  async function syncWallet(walletWasm) {
    // synchronize with progress notifications
    await walletWasm.sync(
      new (class extends monerojs.MoneroWalletListener {
        onSyncProgress(height, startHeight, endHeight, percentDone, message) {
          console.log(message);
        }
      })()
    );
  }

  return (
    <div>
      <button onClick={syncWallet(walletVariables.wallet)}>Start Sync</button>
    </div>
  );
}

// Defining property types
Wallet.propTypes = {
  walletFunctions: PropTypes.object,
  walletVariables: PropTypes.object,
};

export default Wallet;
