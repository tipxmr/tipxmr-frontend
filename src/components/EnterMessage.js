import React, { useState } from "react";
import PropTypes from "prop-types";

function EnterMessage({
  setDonor,
  setMessage,
  setShowEnterMessage,
  setShowPayment,
  displayName,
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
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={() => {
              setShowEnterMessage(false);
              setShowPayment(true);
            }}
          >
            Submit
          </button>
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
};
export default EnterMessage;
