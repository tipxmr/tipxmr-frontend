import React from "react";

import { Progressbar, SyncBanner } from "../../components";
import useWalletSynchronisation from "../../hook/useWalletSynchronisation";

function Wallet() {
  const {
    isActive,
    isDone,
    progress,
    start,
    stop,
  } = useWalletSynchronisation();

  function onClick() {
    if (isActive) {
      stop();
    } else {
      start();
    }
  }

  return (
    <div className="h-full">
      <div className="w-1/2 mx-auto mb-4 text-gray-200 text-center">
        <SyncBanner synced={isDone} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="rounded overflow-hidden shadow-lg text-center bg-xmrgray-darker text-xmrorange-lighter">
          <div className="px-4 py-6">
            <p>Your Balance</p>
            <div className="text-4xl my-2">1337 XMR</div>
          </div>
        </div>
        <div className="rounded overflow-hidden shadow-lg text-center bg-xmrgray-darker text-xmrorange-lighter">
          <div className="px-4 py-6">
            <p>Total Transactions</p>
            <div className="text-4xl my-2">420</div>
          </div>
        </div>
        <div className="rounded overflow-hidden shadow-lg text-center bg-xmrgray-darker text-xmrorange-lighter">
          <div className="px-4 py-6">
            <p>Sync Status</p>
            <div className="text-4xl my-2">
              <Progressbar
                percentage={progress}
                isSyncActive={isActive}
                isSynced={isDone}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12 mx-auto w-3/4">
        <button
          onClick={onClick}
          className="bg-xmrorange hover:bg-xmrorange-darker text-white font-bold my-16 py-2 px-4 rounded"
        >
          {isActive ? "Stop Sync" : "Start Sync"}
        </button>
        <h2 className="text-3xl text-center my-3">Transaction History</h2>
        {/* Dynamische Tabelle nach dieser Anleitung */}
        <table className="table-auto border-4 mx-auto">
          <thead>
            <tr className="text-xl">
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Height</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Confirmations</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
}

Wallet.propTypes = {};

export default Wallet;
