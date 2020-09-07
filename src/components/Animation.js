import React, { useState } from "react";

function Animation() {
  const [donor, setDonor] = useState("AlexAnarcho");
  const [amount, setAmount] = useState("420");
  const [message, setMessage] = useState("Testing things out");
  return (
    <div className="flex flex-grow justify-center">
      <div className="my-auto">
        <div className="text-4xl bg-opacity-0 pl-8">
          <p className="text-6xl">
            {donor} donated {amount} XMR
          </p>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
}

export default Animation;
