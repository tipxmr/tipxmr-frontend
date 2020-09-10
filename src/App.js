import React, { useState, useEffect } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import monerojs from "./libs/monero";
import socketio from "./libs/socket";

import {
  Header,
  Footer,
  Start,
  Donate,
  CreateWallet,
  OpenWallet,
  Wallet,
  Animation,
  Dashboard,
  Disclaimer,
  FAQ,
} from "./components";

function App() {
  const flexfull = {
    flex: "1 0 100%",
  };

  const [hashedSeed, setHashedSeed] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [primaryAddress, setPrimaryAddress] = useState(null);
  const [restoreHeight, setRestoreHeight] = useState(661800); // 6. Sep 2020
  const [currentBlockheight, setCurrentBlockheight] = useState(null);
  const [percentageSynced, setPercentageSynced] = useState(0);
  const [isSyncActive, setIsSyncActive] = useState(false);
  const [streamerName, setStreamerName] = useState("MoneroMumble");
  const [donorInfo, setDonorInfo] = useState([]);
  const [donationsQueue, setDonationsQueue] = useState([]);
  const [donationsHistory, setDonationsHistory] = useState([]);

  /* Example for donorInfo object: {
    donatorSocketId: "5NXW3Rj1eKRqjE9sAAOw"
    donor: "Grischa"
    hashedSeed: null
    message: "Test 6"
    streamerName: "MoneroMumble"
    subaddress: "76ABPQ3e2GmVAkDf7BQwXcFb3QCfwG2osQpJo8J3WVVoa4ZrXzPxoEm9fPq7nHdFJMZ32q7B5qGNbBJCiaSBzSAJ1wgFwJi"
    }
    */

  function getNewOutput(output) {
    console.log("getNewOutput aufgerufen, output:", output);
    monerojs
      .getSubaddress(wallet, output.subaddressIndex)
      .then((subaddress) => {
        console.log("Donation an diese Subaddresse:", subaddress);
        console.log("donorInfo:", donorInfo);
        const donationsInfo = donorInfo.find(
          (donationInfo) => donationInfo.subaddress === subaddress
        );
        if (donationsInfo !== undefined) {
          const newDonation = {
            subaddress: subaddress,
            amount: output.amount,
            donor: donationsInfo.donor,
            message: donationsInfo.message,
          };
          console.log("New Donation:", newDonation);
          setDonationsQueue((previousArray) => [...previousArray, newDonation]);
          setDonationsHistory((previousArray) => [
            ...previousArray,
            newDonation,
          ]);
          console.log("donationsInfo:", donationsInfo);
          return newDonation;
        }
        return null;
      })
      .then((newDonation) => {
        if (newDonation !== null && newDonation !== undefined) {
          socketio.emitPaymentRecieved(newDonation);
        }
      });
  }

  const mwl = new monerojs.MyWalletListener(
    setPercentageSynced,
    setCurrentBlockheight,
    getNewOutput
  );

  async function syncWallet() {
    setIsSyncActive(true);
    monerojs.startSyncing(wallet, mwl, restoreHeight).catch((err) => {
      console.error(err);
      setIsSyncActive(false);
    });
  }

  // Connection to backend
  useEffect(() => {
    if (wallet !== null) {
      socketio.emitStreamerInfo(streamerName, hashedSeed);
      socketio.getSubaddress((data) => {
        monerojs.createSubaddress(wallet).then((subaddress) => {
          const newDonorInfo = { ...data, subaddress: subaddress };
          setDonorInfo((previousArray) => [...previousArray, newDonorInfo]);
          socketio.emitReturnSubaddress(newDonorInfo);
          console.log("created Subaddress for:", newDonorInfo);
        });
      });
    }
  }, [wallet]);

  useEffect(() => {
    console.log("isSyncActive: ", isSyncActive);
  }, [isSyncActive]);

  // New Block is added to the chain
  useEffect(() => {
    console.log(
      "New Block (" + currentBlockheight + ") added to the blockchain."
    );
  }, [currentBlockheight]);

  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <Header />
        <div className="flex-auto flex flex-col">
          <div className="flex" style={flexfull}>
            <Route path="/" exact>
              <Start />
            </Route>
            <Route path="/donate" exact>
              <Donate streamerName={streamerName} hashedSeed={hashedSeed} />
            </Route>
            <Route path="/createwallet" exact>
              <CreateWallet />
            </Route>
            <Route path="/openwallet" exact>
              <OpenWallet
                walletFunctions={{
                  setHashedSeed,
                  setWallet,
                  setPrimaryAddress,
                }}
                walletVariables={{ hashedSeed, wallet, primaryAddress }}
              />
            </Route>
            <Route path="/wallet" exact>
              <Wallet
                walletFunctions={{
                  setIsSyncActive,
                  syncWallet,
                  setHashedSeed,
                  setWallet,
                  setPrimaryAddress,
                }}
                walletVariables={{
                  isSyncActive,
                  hashedSeed,
                  wallet,
                  primaryAddress,
                  percentageSynced,
                }}
              />
            </Route>
            <Route path="/animation" exact>
              <Animation />
            </Route>
            <Route path="/dashboard">
              <Dashboard
                walletFunctions={{
                  setIsSyncActive,
                  syncWallet,
                  setHashedSeed,
                  setWallet,
                  setPrimaryAddress,
                }}
                walletVariables={{
                  isSyncActive,
                  hashedSeed,
                  wallet,
                  primaryAddress,
                  percentageSynced,
                }}
              />
            </Route>
            <Route path="/disclaimer">
              <Disclaimer />
            </Route>
            <Route path="/faq">
              <FAQ />
            </Route>
          </div>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
