import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav className="text-white">
      <div className="container mx-auto px-6 py-3 md:flex md:justify-between md:items-center">
        <div className="flex justify-between items-center">
          <div>
            <Link className="md:text-2xl hover:text-xmrgray-darker" to="/">
              TipXMR.live
            </Link>
          </div>
          {/* Mobile menu button */}
        </div>
        {/* Mobile Menu open: "block", Menu closed: "hidden" */}
        <div className="md:flex items-center">
          <div className="flex flex-col md:flex-row md:mx-6">
            <a
              className="my-1 text-sm text-gray-700 font-medium hover:text-indigo-500 md:mx-4 md:my-0"
              href="#"
            >
              Home
            </a>
            <a
              className="my-1 text-sm text-gray-700 font-medium hover:text-indigo-500 md:mx-4 md:my-0"
              href="#"
            >
              Shop
            </a>
            <a
              className="my-1 text-sm text-gray-700 font-medium hover:text-indigo-500 md:mx-4 md:my-0"
              href="#"
            >
              Contact
            </a>
            <a
              className="my-1 text-sm text-gray-700 font-medium hover:text-indigo-500 md:mx-4 md:my-0"
              href="#"
            >
              About
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
