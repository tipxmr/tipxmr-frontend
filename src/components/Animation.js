import React, { useState } from "react";
import { useTransition, animated } from "react-spring";
import useSound from "use-sound";
import stutter from "../sounds/biden-stutter.mp3";

function Animation() {
  const [donor, setDonor] = useState("AlexAnarcho");
  const [amount, setAmount] = useState("420");
  const [message, setMessage] = useState("Testing things out");
  const [showMessage, setShowMessage] = useState(false);
  const messageTransitions = useTransition(showMessage, null, {
    from: { position: "absolute", opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });
  return (
    <div>
      <button onClick={() => setShowMessage(!showMessage)}>
        Show animation
      </button>

      <div className="flex flex-grow justify-center">
        <div className="my-auto">
          <div className="text-4xl bg-opacity-0 pl-8">
            {messageTransitions.map(
              ({ item, key, props }) =>
                item && (
                  <animated.div key={key} style={props} className="text-6xl">
                    <p>
                      {donor} donated {amount} XMR
                    </p>
                    <p>{message}</p>
                  </animated.div>
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Animation;
