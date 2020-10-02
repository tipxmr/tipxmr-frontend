import React, { useEffect, useState } from "react";
import { Progressbar, SyncBanner, Button } from "~/components";
import useWalletSynchronisation from "../../hook/useWalletSynchronisation";
import { useWalletState } from "../../context/wallet";
import { useStreamer } from "../../context/streamer";
import monerojs from "../../libs/monero";
import socketio from "../../libs/socket";

function Wallet() {
  const {
    isActive,
    isDone,
    progress,
    start,
    stop,
  } = useWalletSynchronisation();

  const wallet = useWalletState();
  const [streamerConfig, updateStreamerConfig] = useStreamer();

  const [tableData, setTableData] = useState(null);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [lockedBalance, setLockedBalance] = useState(0);
  const [unlockedBalance, setUnlockedBalance] = useState(0);

  function onClick() {
    if (isActive) {
      stop();
    } else {
      start();
    }
  }

  async function fillTable(txs) {
    // amount, height, date, confirmations, incoming/outgoing
    const data = await txs
      .slice(0)
      .reverse() // because table should show newest tx first
      .map((tx, index) => {
        const { height, timestamp } = tx.state.block.state;
        const { numConfirmations, isIncoming } = tx.state;
        let amount = null;
        const date = new Date(timestamp * 1000).toLocaleString();
        if (isIncoming) {
          amount = tx.state.incomingTransfers[0].state.amount;
          amount = parseFloat(amount) / Math.pow(10, 12);
        } else {
          amount = tx.state.outgoingTransfers[0].state.amount;
          amount = parseFloat(amount) / Math.pow(10, 12);
        }
        return (
          <tr key={index}>
            <td className="border px-4 py-2">{amount} XMR</td>
            <td className="border px-4 py-2">{height}</td>
            <td className="border px-4 py-2">{date}</td>
            <td className="border px-4 py-2">{numConfirmations}</td>
          </tr>
        );
      });
    setTableData(data);
  }

  useEffect(() => {
    if (isDone) {
      // get all transactions
      monerojs.getTxs(wallet.wallet).then((txs) => {
        // fill the table with data
        fillTable(txs);
        // Set number of total transactions
        setTotalTransactions(txs.length);
        // Set unlocked Balance
        wallet.wallet
          .getUnlockedBalance()
          .then((bigInt) => {
            return parseFloat(bigInt) / Math.pow(10, 12);
          })
          .then(setUnlockedBalance);
        // Set locked Balance
        wallet.wallet
          .getBalance()
          .then((bigInt) => {
            return parseFloat(bigInt) / Math.pow(10, 12);
          })
          .then(setLockedBalance);
      });
      // set Online status to true
      socketio.emitUpdateOnlineStatus(streamerConfig.hashedSeed, true);
    } else {
      // set Online status to false
      socketio.emitUpdateOnlineStatus(streamerConfig.hashedSeed, false);
    }
  }, [isDone, wallet.wallet, streamerConfig.hashedSeed]);

  return (
    <div className="h-full">
      <div className="w-1/2 mx-auto mb-4 text-gray-200 text-center">
        <SyncBanner synced={isDone} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="rounded overflow-hidden shadow-lg text-center bg-xmrgray-darker text-xmrorange-lighter">
          <div className="px-4 py-6">
            <p>Your Balance</p>
            <div className="text-2xl my-2">unlocked: {unlockedBalance} XMR</div>
            <div className="text-2xl my-2">locked: {lockedBalance} XMR</div>
          </div>
        </div>
        <div className="rounded overflow-hidden shadow-lg text-center bg-xmrgray-darker text-xmrorange-lighter">
          <div className="px-4 py-6">
            <p>Total Transactions</p>
            <div className="text-6xl my-2">{totalTransactions}</div>
          </div>
        </div>
        <div className="rounded overflow-hidden shadow-lg text-center bg-xmrgray-darker text-xmrorange-lighter">
          <div className="px-4 py-6">
            <p>Wallet Sync</p>
            <div className="text-4xl my-2">
              <Progressbar
                percentage={progress}
                isSyncActive={isActive}
                isSynced={isDone}
              />
            </div>
            <Button
              onClick={onClick}
              className="bg-xmrorange hover:bg-xmrorange-darker text-white font-bold rounded"
            >
              {isActive ? "Stop Sync" : "Start Sync"}
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-12 mx-auto w-3/4">
        <table className="table-auto border-4 mx-auto">
          <thead>
            <tr className="text-xl">
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Height</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Confirmations</th>
            </tr>
          </thead>
          <tbody>{tableData}</tbody>
        </table>
      </div>
    </div>
  );
}

Wallet.propTypes = {};

export default Wallet;
