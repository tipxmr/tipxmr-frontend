import React, { useState, useEffect } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import EnterMessage from "./EnterMessage";
import Payment from "./Payment";
import Success from "./Success";
import socketio from "../libs/socket";

function Donate(props) {
  const [showEnterMessage, setShowEnterMessage] = useState(true);
  const [showPayment, setShowPayment] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [displayName, setDisplayName] = useState("AlexAnarcho");
  const [onlineStatus, setOnlineStatus] = useState(false);
  const [subaddress, setSubaddress] = useState(null);
  const [donor, setDonor] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    // Get Streamer Info from Backend
    const userName = displayName.toLocaleLowerCase();
  }, []);

  function getSubaddress() {
    socketio.emitGetSubaddress(
      displayName,
      userName,
      hashedSeed,
      donor,
      message
    );

    socketio.onSubaddressToDonator(setSubaddress);
  }

  return (
    <div className="flex flex-grow justify-center">
      <div className="my-auto">
        {showEnterMessage ? (
          <EnterMessage
            setDonor={setDonor}
            setMessage={setMessage}
            setShowEnterMessage={setShowEnterMessage}
            setShowPayment={setShowPayment}
            displayName={displayName}
            onlineStatus={onlineStatus}
          />
        ) : null}
        {showPayment ? (
          <Payment
            displayName={displayName}
            donor={donor}
            message={message}
            subaddress={subaddress}
            getSubaddress={getSubaddress}
          />
        ) : null}
        {showSuccess ? <Success /> : null}
      </div>
    </div>
  );
}

export default Donate;
