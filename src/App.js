import React, { useState, useEffect } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import {
  Header,
  Footer,
  LandingPage,
  Payment,
  Success,
  CreateWallet,
  OpenWallet,
  Animation,
} from "./components";
import monerojs from "./libs/monero";

function App() {
  const [paymentinfo, setPaymentinfo] = useState({});
  return (
    <Router>
      <Header />
      <Route path="/" exact>
        <LandingPage onSubmit={setPaymentinfo} />
      </Route>
      <Route path="/payment" exact>
        <Payment donor={paymentinfo.donor} message={paymentinfo.message} />
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
      <Route path="/animation" exact>
        <Animation />
      </Route>
      <Footer />
    </Router>
  );
}

export default App;
