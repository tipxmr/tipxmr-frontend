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

let config = {
  streamername: "AlexAnarcho",
  username: "alexanarcho",
  account: {
    basic: true,
    advanced: true,
    premium: true,
  },
  stream: {
    secondprice: 0.00043,
    fontcolor: "#F23456",
    minamount: 0.00043,
    gifs: true,
    goal: 1,
    goalprogress: 0,
    goalreached: false,
    charlimit: 1000,
    sound: "/src/sounds/crocodile.mp3",
  },
};

function App() {
  const flexfull = {
    flex: "1 0 100%",
  };

  const [hashedSeed, setHashedSeed] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [primaryAddress, setPrimaryAddress] = useState(null);
  const [currentBlockheight, setCurrentBlockheight] = useState(null);
  const [percentageSynced, setPercentageSynced] = useState(0);
  const [isSyncActive, setIsSyncActive] = useState(false);
  const [donorInfo, setDonorInfo] = useState([]);
  const [donationsQueue, setDonationsQueue] = useState([]);
  const [donationsHistory, setDonationsHistory] = useState([]);

  const [streamerConfig, setStreamerConfig] = useState({
    hashedSeed: "",
    displayName: "AlexAnarcho",
    username: "alexanarcho",
    online: false,
    restorHeight: 661800,
    account: {
      basic: true,
      advanced: true,
      premium: true,
    },
    stream: {
      secondPrice: 0.00043,
      fontColor: "#F23456",
      minamount: 0.00043,
      gifs: true,
      goal: 1,
      goalprogress: 0,
      goalreached: false,
      charlimit: 1000,
      sound: "/src/sounds/crocodile.mp3",
    },
  });

  /* Example for donorInfo object: {
    donatorSocketId: "5NXW3Rj1eKRqjE9sAAOw"
    donor: "Grischa"
    hashedSeed: null
    message: "Test 6"
    displayName: "MoneroMumble"
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
    monerojs
      .startSyncing(wallet, mwl, streamerConfig.restorheight)
      .catch((err) => {
        console.error(err);
        setIsSyncActive(false);
      });
  }
  // Connection to backend
  useEffect(() => {
    if (wallet !== null) {
      socketio.emitStreamerInfo(
        streamerConfig.displayname,
        streamerConfig.hashedseed
      );
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
              <Donate
                displayName={streamerConfig.displayname}
                hashedSeed={streamerConfig.hashedseed}
                onlineStatus={streamerConfig.online}
              />
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
                walletVariables={{ hashedseed, wallet, primaryAddress }}
              />
            </Route>
            <Route path="/animation" exact>
              <Animation config={config} />
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
                config={config}
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
