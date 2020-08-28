import React, { useState, useEffect } from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Paymentmask from "./Components/Paymentmask";
import Paymentinfo from "./Components/Paymentinfo";
import TestRPC from "./Components/TestRPC";
import monerojs from "monero-javascript";

import Paymentrecieved from "./Components/Paymentrecieved";
import { Route, BrowserRouter as Router } from "react-router-dom";

function App() {
  const [donor, setDonor] = useState("");

  function handleChange(newValue) {
    setDonor(newValue);
    console.log(donor);
  }
  return (
    <Router>
      <div className="h-screen">
        <Header />
        <Route path="/" exact>
          <Paymentmask />
        </Route>
        <Route path="/payment">
          <Paymentinfo subaddress={"test"} donor={"Tobias"} amount={"1337"} />
        </Route>
        <Route path="/test-payment" exact>
          <Paymentrecieved />
        </Route>
        <Route path="/test" exact>
          <TestRPC />
        </Route>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
