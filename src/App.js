import React, { useEffect } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import {
  Header,
  Footer,
  LandingPage,
  Payment,
  Success,
  CreateWallet,
  OpenWallet,
} from "./components";
import monerojs from "./libs/monero";

function App() {
  return (
    <Router>
      <Header />
      <Route path="/" exact>
        <LandingPage />
      </Route>
      <Route path="/payment" exact>
        <Payment />
      </Route>
      <Route path="/success" exact>
        <Success />
      </Route>
      <Route path="/createwallet" exact>
        <CreateWallet />
      </Route>
      <Route path="/openwallet" exact>
        <OpenWallet />
      </Route>
      <Footer />
    </Router>
  );
}

export default App;
