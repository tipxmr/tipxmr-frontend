import React from "react";
import Nav from "./Nav";

function Header() {
  return (
    <header className="bg-xmrgray-lighter p-4">
      <Nav />
      <h2 className="text-center text-white">
        Tip XMR to your favorite Streamer - LIVE!
      </h2>
    </header>
  );
}

export default Header;
