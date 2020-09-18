import React from "react";
import { Link } from "react-router-dom";

function Start() {
  return (
    <div className="flex flex-grow justify-center">
      <div className="my-auto">
        <Link to="/createwallet">
          <button className="bg-xmrorange hover:bg-xmrorange-darker text-white font-bold my-16 mx-8 py-2 px-4 rounded">
            Create new wallet
          </button>
        </Link>

        <Link to="/openwallet">
          <button className="bg-xmrorange hover:bg-xmrorange-darker text-white font-bold my-16 mx-8 py-2 px-4 rounded">
            Open existing wallet
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Start;
