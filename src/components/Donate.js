import React, { useState } from "react";
import PropTypes from "prop-types";
import EnterMessage from "./EnterMessage";
import Payment from "./Payment";
import Success from "./Success";

function Donate({ createSubaddress }) {
  const [showEnterMessage, setShowEnterMessage] = useState(true);
  const [showPayment, setShowPayment] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [donor, setDonor] = useState(null);
  const [message, setMessage] = useState(null);

  return (
    <div className="flex flex-grow justify-center">
      <div className="my-auto">
        {showEnterMessage ? (
          <EnterMessage
            setDonor={setDonor}
            setMessage={setMessage}
            setShowEnterMessage={setShowEnterMessage}
            setShowPayment={setShowPayment}
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
};
export default Donate;
