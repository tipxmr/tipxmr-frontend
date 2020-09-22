import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components";

function Start() {
  return (
    <div className="flex flex-grow justify-around m-auto">
      <Link to="/createwallet">
        <Button buttonText="Create new wallet" buttonWidth="w-80" />
      </Link>

      <Link to="/openwallet">
        <Button buttonText="Open existing wallet" buttonWidth="w-80" />
      </Link>
    </div>
  );
}

export default Start;
