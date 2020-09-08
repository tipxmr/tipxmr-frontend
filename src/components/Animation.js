import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useTransition, animated } from "react-spring";

function Animation({ config }) {
  // in milliseconds, one second costs 0.00043 xmr
  const timeout = 1000 / config.stream.secondprice;
  const goalprogress = config.stream.goalprogress;
  const sound = config.stream.sound;
  const goal = config.stream.goal;
  const fontcolor = config.stream.fontcolor;
  const [donor, setDonor] = useState("AlexAnarcho");
  const [amount, setAmount] = useState(0.0172);
  const [message, setMessage] = useState("Testing things out");
  const [showMessage, setShowMessage] = useState(false);
  const messageTransitions = useTransition(showMessage, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });
  const Sound = () => {
    return <audio src={sound} autoPlay={true}></audio>;
  };

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
      <div
        className="my-auto text-4xl text-center"
        style={{ color: fontcolor }}
      >
        {messageTransitions.map(
          ({ item, key, props }) =>
            item && (
              <animated.div key={key} style={props}>
                <Sound />
                <p>
                  {donor} donated {amount} XMR
                </p>

                <p>{message}</p>
                <p className="text-xl">
                  Goal: {goalprogress + amount}/{goal} XMR
                </p>
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
