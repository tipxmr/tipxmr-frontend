import React from "react";
import monero from "../images/monero-symbol.png";
import github from "../images/github-logo.png";

function Footer() {
  return (
    <footer className="bg-xmrgray-lighter w-full py-3">
      <div className="flex justify-center mb-3">
        <a
          href="https://www.getmonero.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="inline-block h-16 object-contain mx-3 transform hover:scale-105"
            src={monero}
            alt="Monero Logo"
          />
        </a>
        <a
          href="https://github.com/hundehausen/tipxmr"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="inline-block h-16 object-contain mx-3 transform hover:scale-105"
            src={github}
            alt="GitHub Logo"
          />
        </a>
      </div>
      <div className="text-center text-white text-xl">
        <a href="/disclaimer" className="hover:text-xmrorange">
          Disclaimer
        </a>
      </div>
    </footer>
  );
}

export default Footer;
