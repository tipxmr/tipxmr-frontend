import React, { useState, useEffect } from "react";
import { TiArrowDownThick, TiWeatherDownpour } from "react-icons/ti";
import { useSpring, animated } from "react-spring";
import { useMeasure } from "react-use";
import clsx from "clsx";

// --- QUESTION ---
function Question({ question, isOpen }) {
  const arrowStyles = clsx([
    "transition",
    "transform",
    "duration-200",
    "ease-in-out",
    "white",
    {
      "rotate-180": isOpen, // magic happens here
    },
  ]);

  return (
    <div className="p-4 pl-8 text-xl text-gray-200 flex justify-between">
      <p>{question}</p>
      <TiArrowDownThick className={arrowStyles} color="white" size="1.5em" />
    </div>
  );
}

// ---ANSWER-- -
function Answer({ children, isOpen }) {
  const defaultHeight = "1px";
  const [contentHeight, setContentHeight] = useState(defaultHeight);
  const [ref, { height }] = useMeasure();

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
    <animated.div
      style={expand}
      className="border-4 border-xmrgray-lighter bg-xmrgray-darker border-t-0 overflow-hidden"
    >
      <div className="p-4" ref={ref}>
        {children}
      </div>
    </animated.div>
  );
}

function Faqblock({ question, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className="bg-xmrgray-lighter my-3 transition duration-500"
    >
      <Question question={question} isOpen={isOpen} />
      <Answer isOpen={isOpen}>{children}</Answer>
    </div>
  );
}

export default Faqblock;
