import React from "react";
import clsx from "clsx";
import { Button } from "~/components";

function Info({ stateSetterInfo, stateSetterCreate }) {
  const cardStyle = clsx(["flex-1", "border", "p-6"]);
  const subHeadingStyle = clsx(["text-center", "text-2xl"]);

  function handleChange() {
    stateSetterInfo(false);
    stateSetterCreate(true);
  }

  return (
    <div>
      <div className="flex flex-row flex-1">
        <div className="flex-1 border text-xmrorange space-y-3 p-6">
          <h1 className="text-center text-4xl">
            Accept Monero (XMR) donations in{" "}
            <span className="underline">your</span> livestream today
          </h1>
          <h2 className="text-xl tracking-wide text-center">
            Ready to stream within minutes
          </h2>
        </div>
        <div className="flex-1 flex-col">
          <div className={cardStyle}>
            <h2 className={subHeadingStyle}>OBS + Monero</h2>
            <p>
              tipxmr.live uses the most popular streaming software OBS to
              display donations
            </p>
          </div>
          <div className={cardStyle}>
            <h2 className={subHeadingStyle}>Your keys, your coins</h2>
            <p>
              Tipxmr provides a non-custodial WebAssembly Monero Wallet that
              lives in your browser. Only you control your funds!
            </p>
          </div>
          <div className={cardStyle}>
            <h2 className={subHeadingStyle}>Customize your donations</h2>
            <p>
              Allow donators to send GIFs, set yourself a funding goal, set a
              minimum price for donation and much more
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-row text-center my-6 border-4 border-white border-dashed p-8">
        <div className="flex-3">
          <h2 className={subHeadingStyle}>
            <span className="underline">Step 1:</span> Create your tipxmr
            account
          </h2>
          <p className="tracking-tight">
            Pick a username, create a new Monero wallet, no KYC needed
          </p>
        </div>
        <div className="flex-1 flex-grow self-center">
          <Button onClick={handleChange}>Create new wallet</Button>
        </div>
      </div>
    </div>
  );
}

export default Info;
