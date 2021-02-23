import React from "react";
import Nav from "./Nav";

interface HeaderI {
  userName: string,
}

function Header({ userName }: HeaderI) {
  return (
    <header className="bg-xmrgray-darker p-4">
      <Nav userName={userName} />
    </header>
  );
}

export default Header;
