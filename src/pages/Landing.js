import React from "react";
import clsx from "clsx";
import landingIcon from "~/images/landing-screen.svg";
import { Link } from "react-router-dom";

function Landing() {
  const textShadow = { "text-shadow": "0px 2px 2px rgba(0, 0, 0, 0.5)" };
  const buttonStyle = clsx([
    "block",
    "bg-xmrorange",
    "hover:bg-xmrorange-darker",
    "py-2",
    "px-4",
    "rounded",
    "text-white",
    "uppercase",
    "mt-4",
    "flex-none",
    "mx-auto",
    "max-w-xs",
    "shadow-md",
  ]);
  const containerStyle = clsx([
    "my-12",
    "flex-1",
    "p-6",
    "mx-3",
    "text-center",
    "rounded",
    "shadow-md",
    "border-4",
    "border-xmrorange",
  ]);
  const listStyle = clsx([
    "text-justify",
    "list-disc",
    "mx-8",
    "my-4",
    "text-lg",
    "tracking-tight",
    "leading-tight",
    "space-y-3",
  ]);
  return (
    <div className="flex flex-1 flex-col bg-xmrgray-darker">
      <div className="container mx-auto flex justify-around items-center mt-24">
        <div className="lg:w-3/5 xl:w-2/5 flex flex-row items-start ">
          <h1
            className="text-4xl sm:text-6xl flex-1 text-xmrorange leading-tight tracking-tight m-4"
            style={textShadow}
          >
            Monero donations in your livestream
          </h1>
        </div>

        <img src={landingIcon} alt="tipxmr.live screen" className="flex-1" />
      </div>
      <div className="container mx-auto flex w-full justify-around my-6">
        <div className={containerStyle}>
          <span
            className="uppercase text-center text-2xl text-xmrorange-lighter"
            style={textShadow}
          >
            For Streamers
          </span>
          <ul className={listStyle}>
            <li>
              Earn monero with your livestream right now & reach your funding
              goals
            </li>
            <li>
              Customize your donation settings & interact with your audience
              live
            </li>
            <li>
              Pay a flat fee as low as $1 instead of a percentage - more money
              in your wallet
            </li>
          </ul>
          <Link to="/login/create" className={buttonStyle}>
            Get started now
          </Link>
        </div>

        <div className={containerStyle}>
          <span
            className="uppercase text-center text-2xl text-xmrorange-lighter"
            style={textShadow}
          >
            For Viewers
          </span>
          <ul className={listStyle}>
            <li>
              Support your favorite streamers financially with Monero, while
              staying private
            </li>
            <li>
              Fast and easy payments that allow you to use your own existing
              Monero wallet
            </li>
            <li>Watch streams right here on the website, no download needed</li>
          </ul>
          <Link to="/streamerpage" className={buttonStyle}>
            See who is streaming
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;
