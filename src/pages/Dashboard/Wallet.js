import React, { useEffect, useState } from "react";
import { Progressbar, SyncBanner, Button } from "~/components";
import useWalletSynchronisation from "~/hook/useWalletSynchronisation";
import { useWalletState } from "~/context/wallet";
import { useStreamer } from "~/context/streamer";
import monerojs from "~/libs/monero";
import socketio from "~/libs/socket_streamer";

function Wallet() {
  const {
    isActive,
    isDone,
    progress,
    start,
    stop,
    balance,
    unlockedBalance,
  } = useWalletSynchronisation();

  const wallet = useWalletState();
  const [streamerConfig, updateStreamerConfig] = useStreamer();
  const [tableData, setTableData] = useState(null);
  // transaction states
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [transactionCounter, setTransactionCounter] = useState({
    incoming: 0,
    outgoing: 0,
  });
  // withdraw states
  const [isValidAddress, setIsValidAddress] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [isValidAmount, setIsValidAmount] = useState(false);
  const [withdrawAddress, setWithdrawAddress] = useState(null);

  // start or stop sync
  function handleSync() {
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
        let inout = "incoming";
        const date = new Date(timestamp * 1000).toLocaleString();
        console.log("transfer", tx.state);
        if (isIncoming) {
          amount =
            parseFloat(tx.state.incomingTransfers[0].state.amount) /
            Math.pow(10, 12);
          inout = "incoming";
          setTransactionCounter((prevState) => ({
            ...prevState,
            incoming: prevState.incoming + 1,
          }));
        } else {
          amount =
            parseFloat(tx.state.outgoingTransfer.state.amount) /
            Math.pow(10, 12);
          inout = "outgoing";
          setTransactionCounter((prevState) => ({
            ...prevState,
            outgoing: prevState.outgoing + 1,
          }));
        }
        const cellStyle =
          inout === "incoming"
            ? "bg-green-500 border px-4 py-2"
            : "bg-red-500 border px-4 py-2";
        return (
          <tr key={index}>
            <td className={cellStyle}>{inout}</td>
            <td className={cellStyle}>{amount} XMR</td>
            <td className={cellStyle} title={tx.state.hash}>
              {height}
            </td>
            <td className={cellStyle}>{date}</td>
            <td className={cellStyle}>{numConfirmations}</td>
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
      });
      // set Online status to true
      socketio.emitUpdateOnlineStatus(streamerConfig.hashedSeed, true);
    } else {
      // set Online status to false
      socketio.emitUpdateOnlineStatus(streamerConfig.hashedSeed, false);
    }
  }, [isDone, wallet.wallet, streamerConfig.hashedSeed]);

  // Withdraw
  function handleAddressChange(event) {
    const withdrawAddress = event.target.value;
    setWithdrawAddress(withdrawAddress);
    setIsValidAddress(monerojs.isValidAddress(withdrawAddress.trim()));
  }

  function handleWithdrawAllButton() {
    setWithdrawAmount(unlockedBalance);
    amountValidation(unlockedBalance);
  }

  function handleWithdrawAmountChange(event) {
    const amount = parseFloat(event.target.value);
    setWithdrawAmount(amount);
    amountValidation(amount);
  }

  function amountValidation(amount) {
    if (amount <= 0) {
      setIsValidAmount(false);
      console.error("Withdraw amount is 0 or negative");
    } else if (amount > unlockedBalance) {
      setIsValidAmount(false);
      console.error("Withdraw amount is greater than unlocked balance");
    } else {
      setIsValidAmount(true);
    }
  }

  async function withdraw() {
    console.log("Withdraw request");
    console.log("Wallet:", wallet);
    console.log("withdrawAddress:", withdrawAddress);
    console.log("withdrawAmount:", withdrawAmount);
    wallet.wallet
      .getDaemonHeight()
      .then((daemonHeight) => console.log("DeamonHeight:", daemonHeight));
    wallet.wallet
      .getHeight()
      .then((walletHeight) => console.log("WalletHeight:", walletHeight));
    monerojs
      .createTx(wallet.wallet, withdrawAddress, withdrawAmount)
      .then((tx) => {
        if (!(tx instanceof Error)) {
          console.log("Tx created:", tx);
        } else {
          console.error("error with tx:", error);
        }
      });
  }

  return (
    <div className="h-full text-gray-200">
      <div className="mx-auto">
        <div className="w-1/2 mx-auto mb-4 text-gray-200 text-center ">
          <SyncBanner synced={isDone} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="rounded overflow-hidden shadow-lg text-center bg-xmrgray-darker ">
            <div className="px-4 py-6">
              <p>Your Balance</p>
              <div className="text-2xl my-2">🔓: {unlockedBalance} XMR</div>
              <div className="text-2xl my-2">🔐: {balance} XMR</div>
            </div>
          </div>
          <div className="rounded overflow-hidden shadow-lg text-center bg-xmrgray-darker ">
            <div className="px-4 py-6">
              <p>Total Transactions</p>
              <div
                title={
                  "Incoming: " +
                  transactionCounter.incoming +
                  " Outgoing: " +
                  transactionCounter.outgoing
                }
                className="text-6xl my-2"
              >
                {totalTransactions}
              </div>
            </div>
          </div>
          <div className="rounded overflow-hidden shadow-lg text-center bg-xmrgray-darker ">
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
                onClick={handleSync}
                className="bg-xmrorange hover:bg-xmrorange-darker text-white font-bold rounded"
              >
                {isActive ? "Stop Sync" : "Start Sync"}
              </Button>
            </div>
          </div>
          <div className="col-span-3">
            <div className="flex flex-col justify-center p-4 rounded overflow-hidden shadow-lg text-center bg-xmrgray-darker ">
              <div className="flex-1">
                <p>Send funds to another wallet</p>
              </div>
              <div className="flex flex-1 flex-row items-center m-4">
                <label htmlFor="withdrawAmount">Amount</label>
                <input
                  className="m-5 text-xmrgray-darker bg-gray-200 p-2 rounded"
                  type="number"
                  min="0.000001"
                  max={unlockedBalance}
                  step="0.000000000001"
                  value={withdrawAmount}
                  name="withdrawAmount"
                  onChange={(event) => handleWithdrawAmountChange(event)}
                ></input>
                XMR
                <Button onClick={handleWithdrawAllButton}>All</Button>
                <label htmlFor="withdrawAddress">Address</label>
                <input
                  className="m-5 text-xmrgray-darker bg-gray-200 p-2 rounded"
                  type="text"
                  name="withdrawAddress"
                  onChange={(event) => handleAddressChange(event)}
                ></input>
                <Button
                  disabled={!isValidAddress || !isValidAmount}
                  onClick={withdraw}
                >
                  Send
                </Button>
              </div>
            </div>
            <div className="mt-12 flex flex-grow justify-center">
              <table className="table-auto border-4 mx-auto">
                <thead>
                  <tr className="text-xl">
                    <th className="px-4 py-2">Type</th>
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
        </div>
      </div>
    </div>
  );
}

Wallet.propTypes = {};

export default Wallet;
