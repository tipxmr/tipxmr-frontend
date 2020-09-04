import React, { useState } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import monerojs from "./libs/monero";
import {
  Header,
  Footer,
  LandingPage,
  Payment,
  Success,
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
  const [paymentinfo, setPaymentinfo] = useState({});
  const [hashedSeed, setHashedSeed] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [primaryAddress, setPrimaryAddress] = useState(null);
  const [restoreHeight, setRestoreHeight] = useState(650113); // 23.August2020
  const [percentageSynced, setPercentageSynced] = useState(0);
  const [IsSyncActive, setIsSyncActive] = useState(false);

  const mwl = new monerojs.MyWalletListener(setPercentageSynced);

  async function syncWallet() {
    setIsSyncActive(true);
    monerojs.sync(wallet, mwl, restoreHeight).catch((err) => {
      console.error(err);
      setIsSyncActive(false);
    });
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <Header />
        <div className="flex-auto flex flex-col">
          <div className="flex" style={flexfull}>
            <Route path="/" exact>
              <LandingPage onSubmit={setPaymentinfo} />
            </Route>
            <Route path="/payment" exact>
              <Payment
                donor={paymentinfo.donor}
                message={paymentinfo.message}
              />
            </Route>
            <Route path="/success" exact>
              <Success />
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
                  IsSyncActive,
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
                  IsSyncActive,
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
