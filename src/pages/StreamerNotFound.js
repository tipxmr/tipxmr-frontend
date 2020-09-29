import React from "react";
import { BiUpsideDown } from "react-icons/bi";

function StreamerNotFound() {
  return (
    <div className="flex flex-grow justify-center">
      <div className="self-center text-center">
        <BiUpsideDown size="4em" className="mx-auto" />
        <h2 className="text-xl">Ups, this streamer does not exist!</h2>
        <a className="underline text-xmrorange">See who else is online</a>
      </div>
    </div>
  );
}

export default StreamerNotFound;
