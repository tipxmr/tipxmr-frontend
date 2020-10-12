import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { IsOnlineBadge, Button, Counter } from "~/components";
import clsx from "clsx";
import { BsDisplay } from "react-icons/bs";

function MessageArea({ message, setMessage, charLimit }) {
  const textBoxStyle = clsx([
    "flex flex-grow p-2 mx-3 border border-gray-600 rounded",
  ]);

  return (
    <div className="flex flex-grow relative h-32 mx-3">
      <textarea
        type="text"
        className={textBoxStyle}
        placeholder="Enter your message here..."
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <p className="bottom-0 right-0 absolute text-gray-600 text-xs tracking-tight px-4">
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
  charPrice,
  stream,
}) {
  const [usdPrice, setUsdPrice] = useState();
  const usdConvert = (usdPrice * total).toFixed(2);
  const [seconds, setSeconds] = useState(0);

  const inputStyles = clsx([
    "block m-4 p-2 border border-gray-600 w-2/3 mx-auto text-center rounded",
  ]);

  useEffect(() => {
    // Get MoneroPrice as number
    fetch("https://api.coinpaprika.com/v1/tickers/xmr-monero?quotes=USD")
      .then((response) => response.json())
      .then((res) => res.quotes.USD.price)
      .then(setUsdPrice)
      .catch(console.error);
  }, []);

  useEffect(() => {
    setTotal(secondPrice * seconds + message.length * charPrice);
  }, [message, seconds]);

  // useEffect(() => {
  //   setUsdConvert((usdPrice * total).toFixed(2));
  // }, [total, usdPrice]);

  console.log("streamer-stream", stream);
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
        <div className="flex flex-row justify-around items-center">
          {/* <div className="flex-1"> */}
          <IsOnlineBadge isOnline={isOnline} />
          {/* </div> */}
          {/* <div className="flex-1"> */}
          <a href={stream.url}>
            <BsDisplay size="1.2em" color="text-gray-700" />
          </a>
          {/* </div> */}
        </div>
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
          <div className="w-3/5 mx-auto m-4 text-gray-600">
            {secondPrice ? (
              <div className="flex items-center justify-center">
                <p className="tracking-tight mr-3">Showtime: </p>{" "}
                <Counter count={seconds} setCount={setSeconds} />
                <p className="tracking-tight ml-3">seconds</p>
              </div>
            ) : null}

            <div className="my-3">
              <p className="tracking-tight text-xs">Total cost:</p>{" "}
              {total.toFixed(5)} XMR = {usdConvert} $
            </div>
          </div>
        </div>
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
  secondPrice: PropTypes.number,
  total: PropTypes.number,
  setTotal: PropTypes.func,
  message: PropTypes.string,
  charLimit: PropTypes.number,
  charPrice: PropTypes.number,
};
export default EnterMessage;
