import React from "react";
import monero from "../images/monero-symbol.png";
import github from "../images/github-logo.png";

function Footer() {
  return (
    <footer className="absolute bottom-0 bg-xmrgray-lighter w-full py-5">
      <div className="flex justify-center">
        <a
          href="https://www.getmonero.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="inline-block h-16 object-contain mx-3"
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
            className="inline-block h-16 object-contain mx-3"
            src={github}
            alt="GitHub Logo"
          />
        </a>
      </div>
      <p className="text-center text-white">Find out more</p>
    </footer>
  );
}

export default Footer;
