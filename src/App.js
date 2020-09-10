import React, { useState, useEffect } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import monerojs from "./libs/monero";
import io from "socket.io-client";
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
  const [restoreHeight, setRestoreHeight] = useState(650113); // 23.August2020
  const [percentageSynced, setPercentageSynced] = useState(0);
  const [isSyncActive, setIsSyncActive] = useState(false);
  const [streamerName, setStreamerName] = useState("MoneroMumble");

  const mwl = new monerojs.MyWalletListener(setPercentageSynced);

  async function syncWallet() {
    setIsSyncActive(true);
    monerojs.sync(wallet, mwl, restoreHeight).catch((err) => {
      console.error(err);
      setIsSyncActive(false);
    });
  }
  // Connection to backend
  useEffect(() => {
    if (wallet !== null) {
      const socket = io("ws://localhost:3000");
      socket.on("connect", () => {
        socket.emit("streamerInfo", {
          streamerName: streamerName,
          hashedSeed: hashedSeed,
        });
        socket.on("getSubaddress", (data) => {
          monerojs.createSubaddress(wallet).then((subaddress) => {
            data.subaddress = subaddress;
            donorInfo.push(data);
            socket.emit("returnSubaddress", data);
            console.log("created Subaddress for:", data);
          });
        });
      });
    }
  }, [wallet]);

  useEffect(() => {
    console.log("isSyncActive: ", isSyncActive);
  }, [isSyncActive]);

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
