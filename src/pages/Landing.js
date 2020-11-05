import React from "react";
import clsx from "clsx";
import landingIcon from "~/images/landing-screen.svg";

function Landing() {
  const textShadow = { "text-shadow": "0px 2px 2px rgba(0, 0, 0, 0.5)" };
  const buttonStyle = clsx([
    "block",
    "bg-xmrorange",
    "hover:bg-xmrorange-darker",
    "py-2",
    "px-4",
    "rounded",
    "text-sm",
    "text-white",
    "uppercase",
    "my-4",
    "flex-none",
    "mx-auto",
    "max-w-xs",
    "shadow-md",
  ]);
  const containerStyle = clsx([
    "mt-24",
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
          <span className="uppercase text-center text-2xl text-xmrorange-lighter">
            For Streamers
          </span>
          <ul className={listStyle}>
            <li>
              Earn monero with your livestream right now & reach your funding
              goals
            </li>
            <li>
              Interact with your audience live with text, pictures, gifs & sound
            </li>
            <li>
              Build an online presence independent of large video platforms and
              big brother
            </li>
          </ul>

          <a href="#" className={buttonStyle}>
            Get started now
          </a>
        </div>
        <div className={containerStyle}>
          <span className="uppercase text-center text-2xl text-xmrorange-lighter">
            For Viewers
          </span>
          <ul className={listStyle}>
            <li>Support your favorite streamers financially with Monero</li>
            <li>Keep your privacy while interacting with text & gifs</li>
            <li>Watch streams right here on the website, no download needed</li>
          </ul>

          <a href="#" className={buttonStyle}>
            Get started
          </a>
        </div>
      </div>
    </div>
  );
}

export default Landing;
