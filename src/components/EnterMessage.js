import React from "react";
import PropTypes from "prop-types";
import IsOnlineBadge from "./IsOnlineBadge";
import { Button } from "./";

function EnterMessage({
  setDonor,
  setMessage,
  setShowEnterMessage,
  setShowPayment,
  displayName,
  isOnline,
}) {
  return (
    <div className="flex flex-grow justify-center">
      <div className="my-auto">
        <h2 className="text-center text-3xl">
          <span role="img" aria-label="Green Money">
            💸
          </span>
          Donate to <span className="font-bold">{displayName}</span> with Monero
          <span role="img" aria-label="Green Money">
            💸
          </span>
        </h2>
        <IsOnlineBadge isOnline={isOnline} />
        <input
          type="text"
          align="middle"
          className="block w-1/2 text-center mx-auto mt-4 p-2 border border-8 border-gray-600"
          placeholder="Your Name"
          onChange={(e) => {
            setDonor(e.target.value);
          }}
        />
        <input
          type="text"
          className="block w-5/6 mx-auto text-center mt-4 p-2 border border-8 border-gray-600"
          placeholder="Your Message"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <div className="w-full flex justify-center">
          <Button
            onClick={() => {
              setShowEnterMessage(false);
              setShowPayment(true);
            }}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
EnterMessage.propTypes = {
  setDonor: PropTypes.func,
  setMessage: PropTypes.func,
  setShowEnterMessage: PropTypes.func,
  setShowPayment: PropTypes.func,
  displayName: PropTypes.string,
  isOnline: PropTypes.bool,
};
export default EnterMessage;
