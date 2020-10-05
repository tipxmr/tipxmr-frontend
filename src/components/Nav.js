import React from "react";
import { Link } from "react-router-dom";
import logo from "~/images/tipxmr-live.png";
import ProfilePicture from "./ProfilePicture";

function Nav() {
  return (
    <nav className="text-white">
      <div className="flex flex-grow justify-around self-center items-center">
        <div className="flex-1 pr-8">
          <Link to="/">
            <img
              src={logo}
              alt="tipxmr logo"
              className="w-64 transform hover:scale-105 shadow-lg"
            />
          </Link>
        </div>
        <div className="flex flex-2 flex-grow flex-col md:flex-row text-right sm:text-center md:justify-around lg:text-xl items-center">
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
            <ProfilePicture />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
