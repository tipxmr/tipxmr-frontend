import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import {
  EnterMessage,
  Payment,
  Success,
  Button,
  Toggle,
  StreamerNotFound,
} from "~/components";
import socketio from "../libs/socket";

// TODO Implement the toggle livestream view in donte page
// TODO Button to toggle
// TODO Column layout for livestream and donation mask

function Donate() {
  let { userName } = useParams();
  const [showEnterMessage, setShowEnterMessage] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showStreamerNotFound, setShowStreamerNotFound] = useState(false);
  const [amount, setAmount] = useState(null);

  const [streamer, setStreamer] = useState({
    displayName: "loading",
    userName: "loading",
    isOnline: false,
    hashedSeed: "",
  });
  const [subaddress, setSubaddress] = useState(null);
  const [donor, setDonor] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    // Get Streamer Info from Backend
    socketio.emitGetStreamer(userName);
    socketio.onRecieveStreamerFromBackend(setStreamer);
    socketio.onPaymentConfirmation(paymentConfirmation);
  }, [userName]);

  useEffect(() => {
    console.log("streamer", streamer);
    if (streamer === 0) {
      setShowStreamerNotFound(true);
      setShowPayment(false);
      setShowSuccess(false);
      setShowEnterMessage(false);
    } else {
      setShowStreamerNotFound(false);
      setShowPayment(false);
      setShowSuccess(false);
      setShowEnterMessage(true);
    }
  }, [streamer]);

  function paymentConfirmation(confirmation) {
    console.log("confirmation", confirmation);
    setAmount(confirmation.amount);
    setShowPayment(false);
    setShowSuccess(true);
  }

  function getSubaddress() {
    socketio.emitGetSubaddress(
      streamer.displayName,
      streamer.userName,
      streamer.hashedSeed,
      donor,
      message
    );
    socketio.onSubaddressToDonator(setSubaddress);
  }

  const [showLivestream, setShowLivestream] = useState(false);

  return (
    <div className="flex flex-grow justify-center items-center relative">
      {showLivestream ? (
        <div className="flex-4 h-full">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/5qap5aO4i9A"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ) : null}
      <div className="flex-2">
        <div className="absolute top-0 right-0 m-3">
          <Toggle
            isChecked={showLivestream}
            onClick={() => setShowLivestream(!showLivestream)}
          >
            Watch the stream
          </Toggle>
        </div>
        {showEnterMessage ? (
          <EnterMessage
            setDonor={setDonor}
            setMessage={setMessage}
            setShowEnterMessage={setShowEnterMessage}
            setShowPayment={setShowPayment}
            displayName={streamer.displayName}
            isOnline={streamer.isOnline}
          />
        ) : null}
        {showPayment ? (
          <Payment
            displayName={streamer.displayName}
            donor={donor}
            message={message}
            subaddress={subaddress}
            getSubaddress={getSubaddress}
          />
        ) : null}
        {showSuccess ? (
          <Success
            displayName={streamer.displayName}
            donor={donor}
            message={message}
            amount={amount}
          />
        ) : null}
        {showStreamerNotFound ? <StreamerNotFound /> : null}
      </div>
    </div>
  );
}

export default Donate;
