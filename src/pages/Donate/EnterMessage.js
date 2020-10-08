import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { IsOnlineBadge, Button } from "~/components";
import clsx from "clsx";

function MessageArea({ message, setMessage, charLimit }) {
  const textBoxStyle = clsx([
    "flex flex-grow p-2 mx-3 border border-gray-600 rounded",
  ]);
  console.log(message);
  return (
    <div className="flex flex-grow relative h-32">
      <textarea
        type="text"
        className={textBoxStyle}
        placeholder="Enter your message here..."
        /* message={message} */
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <p className="bottom-0 right-0 absolute text-gray-600 px-4">
        {message ? message.length + "/" + charLimit : null}
      </p>
    </div>
  );
}

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
  message,
  charLimit,
}) {
  const inputStyles = clsx([
    "block m-4 p-2 border border-gray-600 w-2/3 mx-auto text-center rounded",
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
        <div className="flex flex-col text-center">
          <input
            type="text"
            align="middle"
            className={inputStyles}
            placeholder="Your Name"
            onChange={(e) => {
              setDonor(e.target.value);
            }}
          />
          <MessageArea
            message={message}
            setMessage={setMessage}
            charLimit={charLimit}
          />
          {secondPrice ? (
            <div className="flex flex-col">
              <input
                type="text"
                className={inputStyles}
                placeholder="Showtime in seconds"
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
        </div>
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
