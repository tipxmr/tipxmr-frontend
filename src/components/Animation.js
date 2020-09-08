import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useTransition, animated } from "react-spring";
import ring from "../sounds/one-ring.mp3";

const Sound = () => {
  return <audio src={ring} autoPlay={true}></audio>;
};

function Animation({ config }) {
  // in milliseconds, one second costs 0.00043 xmr
  const timeout = 1000 / config.secondprice;
  const [donor, setDonor] = useState("AlexAnarcho");
  const [amount, setAmount] = useState(0.00172);
  const [message, setMessage] = useState("Testing things out");
  const [showMessage, setShowMessage] = useState(false);
  const messageTransitions = useTransition(showMessage, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });
  function dismountMessage() {
    setTimeout(() => setShowMessage(false), timeout * amount);
  }
  return (
    <div
      className="flex flex-grow justify-center bg-opacity-0"
      onClick={() => {
        setShowMessage(!showMessage);
        dismountMessage();
      }}
    >
      <div className="my-auto text-4xl text-center">
        {messageTransitions.map(
          ({ item, key, props }) =>
            item && (
              <animated.div key={key} style={props}>
                <Sound />
                <p>
                  {donor} donated {amount} XMR
                </p>

                <p>{message}</p>
              </animated.div>
            )
        )}
      </div>
    </div>
  );
}

Animation.propTypes = {
  config: PropTypes.object,
};

export default Animation;
