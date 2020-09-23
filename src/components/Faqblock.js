import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { useMeasure } from "react-use";
import clsx from "clsx";
import { FcExpand } from "react-icons/fc";

function Faqblock({ question, children }) {
  // answer show on isOpen
  const [isOpen, setIsOpen] = useState(false);
  const defaultHeight = "1px";
  const [contentHeight, setContentHeight] = useState(defaultHeight);
  const [ref, { height }] = useMeasure();

  // --- QUESTION ---
  function Question(question) {
    const arrowStyles = clsx([
      "transition",
      "transform",
      "duration-200",
      "ease-in-out",
      {
        "rotate-180": isOpen, // magic happens here
      },
    ]);

    return (
      <div className="p-4 pl-8 text-xl text-white flex justify-between">
        <p>{question}</p>
        <FcExpand className={arrowStyles} />
      </div>
    );
  }

  // --- ANSWER ---
  function Answer(answer) {
    return (
      <animated.div
        style={expand}
        className="p-4 border-4 border-xmrgray-lighter bg-gray-200 border-t-0"
      >
        <div ref={ref}>{children}</div>
      </animated.div>
    );
  }

  // Answer animation
  const expand = useSpring({
    config: { friction: 10 },
    height: isOpen ? `${contentHeight + 30}px` : defaultHeight,
  }); // adding a little extra space for the height of the answer

  useEffect(() => {
    // Set initial height
    setContentHeight(height);

    // Add resize event listener
    window.addEventListener("resize", setContentHeight(height));

    // Clean up
    return window.removeEventListener("resize", setContentHeight(height));
  }, [height]);

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className="bg-xmrgray-lighter my-3 transition duration-500"
    >
      {Question(question)}
      {isOpen ? Answer(children) : ""}
    </div>
  );
}

export default Faqblock;
