import React from "react";

function Paymentrecieved() {
  const streamerName = "StreamerName";
  const amount = "1337";
  const message = "This is an example message";
  return (
    <div className="mt-64 text-center font-bold">
      <h2 className="text-6xl">
        <span role="img" aria-label="Green checkmark">
          ✅
        </span>
        <span role="img" aria-label="One hundo">
          💯
        </span>
        <span role="img" aria-label="High Five">
          🙏
        </span>
      </h2>
      <h2>We got it!</h2>
      <h3>The payment was successful</h3>
      <div className="font-normal mt-6 border-t-4 border-dotted">
        <h2 className="pt-6">
          You sent <span className="font-black">{amount} XMR</span> to{" "}
          <span className="font-black">{streamerName}</span>{" "}
        </h2>
        <h2>with the message:</h2>
        <h2 className="pt-4 italic">{message}</h2>
      </div>
    </div>
  );
}

export default Paymentrecieved;
