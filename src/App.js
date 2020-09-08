import React, { useState, useEffect } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import monerojs from "./libs/monero";
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
  secondprice: 0.00043,
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

  const mwl = new monerojs.MyWalletListener(setPercentageSynced);

  async function syncWallet() {
    setIsSyncActive(true);
    monerojs.sync(wallet, mwl, restoreHeight).catch((err) => {
      console.error(err);
      setIsSyncActive(false);
    });
  }
  // Funktion wird der Paymentseite übergeben, da die sich die Wallet in App.js befindet und nicht an die Paymentseite
  // weitergeleitet werden soll, da diese dem Zuschauer ausgeliefert wird.
  async function createSubaddress() {
    const subaddress = await monerojs.createSubaddress(wallet);
    console.log("Subadress:", subaddress);
    return subaddress;
  }

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
              <Donate createSubaddress={createSubaddress} />
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
