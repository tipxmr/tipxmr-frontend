import React from "react";
import clsx from "clsx";

function Landing() {
  const buttonStyle = clsx([
    "bg-xmrorange",
    "hover:bg-xmrorange-darker",
    "py-2",
    "px-4",
    "rounded-full",
    "text-sm",
    "text-white",
    "uppercase",
    "mt-10",
  ]);
  return (
    <div className="flex flex-1 flex-grow">
      <div className="bg-xmrgray-darker flex-1 overflow-hidden">
        <div className="container mx-auto flex items-center px-6 md:px-12 py-24 xl:py-40">
          <div className="lg:w-3/5 xl:w-2/5 flex flex-col items-start relative z-10">
            <span className="uppercase text-xmrorange">
              #monero #livestream #cryptocurrency
            </span>

            <h1 className="text-4xl sm:text-6xl text-red-400 leading-tight mt-4">
              Monero donations in your livestream
            </h1>
            <div className="max-w-md">
              <p className="text-xmrorange mt-6 text-lg">
                The most independent and censorship resistant way to monetize
                livestreams on the globe
              </p>
            </div>
            <div className="w-full flex justify-around">
              <a href="#" className={buttonStyle}>
                Streaming right now
              </a>
              <a href="#" className={buttonStyle}>
                Get started
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
