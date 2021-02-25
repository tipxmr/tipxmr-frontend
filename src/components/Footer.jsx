import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

function Footer() {
  const linkStyle = clsx([
    "transform",
    "hover:text-xmrorange-lighter",
    "hover:scale-110",
  ]);
  return (
    <footer className="text-white text-xs lg:text-sm bg-xmrgray-darker w-full py-3">
      <div className="flex flex-col items-center sm:flex-row sm:justify-around">
        <Link to="/disclaimer" className={linkStyle}>
          Disclaimer
        </Link>
        <Link to="/faq" className={linkStyle}>
          FAQ
        </Link>

        <a href="https://getmonero.org" className={linkStyle}>
          GetMonero
        </a>
        <a
          href="https://github.com/hundehausen/tipxmr"
          target="_blank"
          rel="noopener noreferrer"
          className={linkStyle}
        >
          GitHub
        </a>
      </div>
    </footer>
  );
}

export default Footer;
