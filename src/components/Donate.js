import React, { useState } from "react";
import PropTypes from "prop-types";
import EnterMessage from "./EnterMessage";
import Payment from "./Payment";
import Success from "./Success";
import socketio from "../libs/socket";

function Donate({ displayName, hashedSeed, onlineStatus }) {
  const [showEnterMessage, setShowEnterMessage] = useState(true);
  const [showPayment, setShowPayment] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [subaddress, setSubaddress] = useState(null);
  const [donor, setDonor] = useState(null);
  const [message, setMessage] = useState(null);

  function getSubaddress() {
    socket.emit("getSubaddress", {
      displayName: displayName,
      hashedSeed: hashedSeed,
      donor: donor,
      message: message,
    });

    socket.on("returnSubaddress", (data) => {
      setSubaddress(data.subaddress);
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
            displayName={displayName}
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
  displayName: PropTypes.string,
  hashedSeed: PropTypes.string,
  onlineStatus: PropTypes.bool,
};
export default Donate;
