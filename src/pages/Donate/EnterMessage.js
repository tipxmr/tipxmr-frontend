import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { IsOnlineBadge, Button } from "~/components";
import clsx from "clsx";

function EnterMessage({
  setDonor,
  setMessage,
  setShowEnterMessage,
  setShowPayment,
  displayName,
  isOnline,
  secondPrice,
  total,
  setTotal,
}) {
  const inputStyles = clsx([
    "block w-2/3 mx-auto m-4 p-2 border border-gray-600 text-center",
  ]);

  // test-values
  const [seconds, setSeconds] = useState(0);

  function calcTotal(e) {
    const seconds = e.target.value;
    const total = secondPrice * seconds;
    setSeconds(seconds);
    setTotal(total);
  }

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
          className={inputStyles}
          placeholder="Your Name"
          onChange={(e) => {
            setDonor(e.target.value);
          }}
        />
        <input
          type="text"
          className={inputStyles}
          placeholder="Your Message"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        {secondPrice ? (
          <div className="mx-auto">
            <input
              type="text"
              className={inputStyles}
              placeholder="How many seconds should your message show?"
              onChange={calcTotal}
            />
            <div className="w-3/5 mx-auto text-sm text-gray-600 text-right">
              <p>
                <span className="tracking-tight text-xs">Showtime:</span>{" "}
                {seconds} seconds
              </p>

              <p>
                <span className="tracking-tight text-xs">Total cost:</span>{" "}
                {total} XMR
              </p>
            </div>
          </div>
        ) : null}
        <div className="mt-4 w-full flex justify-center">
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
