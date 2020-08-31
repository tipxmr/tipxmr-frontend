import React, { useEffect } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { Header, Footer, LandingPage, Payment, Success } from "./components";
import { createWallet, newSubaddress } from "./libs/monero";

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
        <LandingPage />
      </Route>
      <Route path="/payment" exact>
        <Payment />
      </Route>
      <Route path="/success" exact>
        <Success />
      </Route>
      <Footer />
    </Router>
  );
}

export default App;
