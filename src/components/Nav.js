import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/tipxmr-live.png";

function Nav() {
  return (
    <nav className="text-white">
      <div className="container mx-auto px-6 py-3 md:flex md:justify-between md:items-center">
        <div className="flex justify-between items-center">
          <div className="mb-3 md:mb-0">
            <Link to="/">
              <img
                src={logo}
                alt="tipxmr logo"
                className="w-64 transform hover:scale-105"
              />
            </Link>
          </div>
          {/* Mobile menu button */}
        </div>
        {/* Mobile Menu open: "block", Menu closed: "hidden" */}
        <div className="md:flex items-center">
          <div className="flex flex-col md:flex-row md:mx-6">
            <Link
              to="/payment"
              className="my-1 md:my-0 md:mx-3 hover:text-xmrorange"
            >
              Payment
            </Link>
            <Link
              to="/success"
              className="my-1 md:my-0 md:mx-3 hover:text-xmrorange"
            >
              Success
            </Link>
            <Link
              to="/createwallet"
              className="my-1 md:my-0 md:mx-3 hover:text-xmrorange"
            >
              CreateWallet
            </Link>
            <Link
              to="/openwallet"
              className="my-1 md:my-0 md:mx-3 hover:text-xmrorange"
            >
              OpenWallet
            </Link>
            <Link
              to="/wallet"
              className="my-1 md:my-0 md:mx-3 hover:text-xmrorange"
            >
              Wallet
            </Link>
            <Link
              to="/animation"
              className="my-1 md:my-0 md:mx-3 hover:text-xmrorange"
            >
              Animation
            </Link>
            <Link
              to="/dashboard"
              className="my-1 md:my-0 md:mx-3 hover:text-xmrorange"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
