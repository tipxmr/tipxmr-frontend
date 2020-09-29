import React from "react";
import { BiUpsideDown } from "react-icons/bi";

function NotFound404() {
  return (
    <div className="flex flex-grow justify-center">
      <div className="self-center text-center">
        <BiUpsideDown size="4em" className="mx-auto" />

        <p>Error: 404</p>
        <h2 className="text-xl">There does not seem to be anything here</h2>
      </div>
    </div>
  );
}

export default NotFound404;
