import React from "react";
import monero from "../images/monero-symbol.png";

function Footer() {
  return (
    <footer className="absolute bottom-0 bg-gray-400 w-full py-5">
      <a
        href="https://www.getmonero.org/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          className="h-16 object-contain mx-auto"
          src={monero}
          alt="Monero Logo"
        />
      </a>
      <p className="text-center">This is my Footer</p>
    </footer>
  );
}

export default Footer;
