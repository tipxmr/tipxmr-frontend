import React from "react";
import { Link } from "react-router-dom";
import logo from "~/images/tipxmr-live.png";

function Nav() {
  return (
    <nav className="text-white">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
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
        </div>
        <div className="flex items-center">
          <div className="flex flex-col md:flex-row mx-6">
            <Link
              to="/streamerpage"
              className="my-1 md:my-0 md:mx-3 hover:text-xmrorange"
            >
              Streams
            </Link>
            {/*Should be removed later on since acccessed through streams*/}
            <Link
              to="/donate/alexanarcho"
              className="my-1 md:my-0 md:mx-3 hover:text-xmrorange"
            >
              Donate
            </Link>
            <Link
              to="/animation"
              className="my-1 md:my-0 md:mx-3 hover:text-xmrorange"
            >
              Animation
            </Link>
            <Link to="/" className="my-1 md:my-0 md:mx-3 hover:text-xmrorange">
              Account
            </Link>

            <Link
              to="/faq"
              className="my-1 md:my-0 md:mx-3 hover:text-xmrorange"
            >
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
