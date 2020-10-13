import React from "react";
import { Link } from "react-router-dom";
import logo from "~/images/tipxmr-live.png";
import ProfilePicture from "./ProfilePicture";
import clsx from "clsx";

function Nav() {
  const linkStyle = clsx([
    "my-1",
    "md:my-0",
    "md:mx-3",
    "hover:text-xmrorange-lighter",
    "transform",
    "hover:scale-110",
  ]);
  return (
    <nav className="text-gray-200">
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
          <Link to="/streamerpage" className={linkStyle}>
            Streams
          </Link>
          {/*Should be removed later on since acccessed through streams*/}
          <Link to="/donate/alexanarcho" className={linkStyle}>
            Donate
          </Link>
          <Link to="/animation" className={linkStyle}>
            Animation
          </Link>
          <Link to="/" className={linkStyle}>
            <ProfilePicture />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
