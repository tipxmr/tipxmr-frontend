import React, { useEffect } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import {
  Header,
  Footer,
  Paymentmask,
  Paymentinfo,
  Paymentrecieved,
} from "./components";
import { createWallet, newSubaddress } from "./libs/monero";
import "./styles.css";

function App() {
  useEffect(() => {
    createWallet()
      .then(newSubaddress)
      .then((subaddress) => console.log(subaddress.state.address));
  }, []);

  return (
    <Router>
      <Header />
      <Route path="/" exact>
        <Paymentmask />
      </Route>
      <Route path="/payment" exact>
        <Paymentinfo />
      </Route>
      <Route path="/success" exact>
        <Paymentrecieved />
      </Route>
      <Footer />
    </Router>
  );
}

export default App;
