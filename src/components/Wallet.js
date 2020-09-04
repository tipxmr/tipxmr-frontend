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
    <div className="h-full">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="rounded overflow-hidden shadow-lg text-center bg-xmrgray-darker text-xmrorange-lighter">
          <div className="px-4 py-6">
            <p>Your Balance</p>
            <div className="text-4xl my-2">1337 XMR</div>
          </div>
        </div>
        <div className="rounded overflow-hidden shadow-lg text-center bg-xmrgray-darker text-xmrorange-lighter">
          <div className="px-4 py-6">
            <p>Total Donations</p>
            <div className="text-4xl my-2">420</div>
          </div>
        </div>
        <div className="rounded overflow-hidden shadow-lg text-center bg-xmrgray-darker text-xmrorange-lighter">
          <div className="px-4 py-6">
            <p>Last Month</p>
            <div className="text-4xl my-2">&#8773; 123 XMR</div>
          </div>
        </div>
      </div>
      <div className="mt-12 mx-auto w-3/4">
        <h2 className="text-3xl text-center my-3">Most recent Donations</h2>
        {/* Dynamische Tabelle nach dieser Anleitung */}
        <table className="table-auto border-4 mx-auto">
          <thead>
            <tr className="text-xl">
              <th className="px-4 py-2">Donor</th>
              <th className="px-4 py-2">Message</th>
              <th className="px-4 py-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-2">
                <td className="px-4 py-2">{item.donor}</td>
                <td className="px-4 py-2">{item.message}</td>
                <td className="px-4 py-2 md:w-16">{item.amount} XMR</td>
                <td />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    /* <div className="flex flex-grow justify-center">
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
    </div> */
  );
}

// Defining property types
Wallet.propTypes = {
  walletFunctions: PropTypes.object,
  walletVariables: PropTypes.object,
};

export default Wallet;
