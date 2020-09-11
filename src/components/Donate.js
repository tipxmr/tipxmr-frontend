import React, { useState } from "react";
import PropTypes from "prop-types";
import EnterMessage from "./EnterMessage";
import Payment from "./Payment";
import Success from "./Success";
import io from "socket.io-client";

function Donate({ streamerName, hashedSeed, onlineStatus }) {
  const [showEnterMessage, setShowEnterMessage] = useState(true);
  const [showPayment, setShowPayment] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [subaddress, setSubaddress] = useState(null);
  const [donor, setDonor] = useState(null);
  const [message, setMessage] = useState(null);

  const socket = io("ws://localhost:3000");

  function getSubaddress() {
    socket.on("connect", () => {
      socket.emit("getSubaddress", {
        streamerName: streamerName,
        hashedSeed: hashedSeed,
        donor: donor,
        message: message,
      });
      socket.on("returnSubaddress", (data) => {
        setSubaddress(data.subaddress);
      });
    });
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
            streamerName={streamerName}
            onlineStatus={onlineStatus}
          />
        ) : null}
        {showPayment ? (
          <Payment
            streamerName={streamerName}
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
Donate.propTypes = {
  streamerName: PropTypes.string,
  hashedSeed: PropTypes.string,
  onlineStatus: PropTypes.bool,
};
export default Donate;
