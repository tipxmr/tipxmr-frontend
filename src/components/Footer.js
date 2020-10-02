import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="text-white text-xs bg-xmrgray-lighter w-full py-3">
      <div className="flex flex-col items-center sm:flex-row sm:justify-around">
        <Link to="/disclaimer" className="hover:text-xmrorange">
          Disclaimer
        </Link>
        <Link to="/faq" className="hover:text-xmrorange">
          FAQ
        </Link>

        <a href="https://getmonero.org" className="hover:text-xmrorange">
          GetMonero
        </a>
        <a
          href="https://github.com/hundehausen/tipxmr"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-xmrorange"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
}

export default Footer;
