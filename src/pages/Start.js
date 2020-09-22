import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components";

function Start() {
  return (
    <div className="flex flex-grow justify-center">
      <div className="my-auto">
        <Link to="/createwallet">
          <Button buttonText="Create new Wallet" buttonWidth="w-80" />
        </Link>

        <Link to="/openwallet">
          <Button buttonText="Open existing wallet" buttonWidth="w-80" />
        </Link>
      </div>
    </div>
  );
}

export default Start;
