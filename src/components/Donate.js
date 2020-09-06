import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import EnterMessage from "./EnterMessage";
import Payment from "./Payment";
import Success from "./Success";
import io from "socket.io-client";

function Donate({ createSubaddress, streamerName, hashedSeed }) {
  const [showEnterMessage, setShowEnterMessage] = useState(true);
  const [showPayment, setShowPayment] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [donor, setDonor] = useState(null);
  const [message, setMessage] = useState(null);
  const [subaddress, setSubaddress] = useState(null);

  useEffect(() => {
    createSubaddress().then((subaddress) => {
      setSubaddress(subaddress);
    });
  }, []);

  // Connection to backend
  useEffect(() => {
    if (subaddress !== null) {
      const socket = io("ws://localhost:3000");
      socket.on("connect", () => {
        console.log("connected");
        socket.emit("returnSubaddress", subaddress);
      });
    }
  }, [subaddress]);

  return (
    <div className="flex flex-grow justify-center">
      <div className="my-auto">
        {showEnterMessage ? (
          <EnterMessage
            setDonor={setDonor}
            setMessage={setMessage}
            setShowEnterMessage={setShowEnterMessage}
            setShowPayment={setShowPayment}
            hashedSeed={hashedSeed}
            streamerName={streamerName}
          />
        ) : null}
        {showPayment ? (
          <Payment
            donor={donor}
            message={message}
            createSubaddress={createSubaddress}
          />
        ) : null}
        {showSuccess ? <Success /> : null}
      </div>
    </div>
  );
}
Donate.propTypes = {
  createSubaddress: PropTypes.func,
  streamerName: PropTypes.string,
  hashedSeed: PropTypes.string,
};
export default Donate;
