import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Link } from "react-router-dom";
import Routes from "./Routes";
import { Header, Footer } from "./components";
import { createWallet, newSubaddress } from "./libs/monero";
import "./styles.css";

function App() {
  useEffect(() => {
    createWallet()
      .then(newSubaddress)
      .then((subaddress) => console.log(subaddress.state.address));
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
