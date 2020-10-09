import React, { useState, useEffect } from "react";
import { useMeasure } from "react-use";
import { useSpring, animated } from "react-spring";
import { FiInfo } from "react-icons/fi";
import clsx from "clsx";

function InfoHover({ displayName, secondPrice, charPrice }) {
  const [isShown, setIsShown] = useState(false);

  // --- ANSWER---
  function Answer({ isOpen }) {
    const defaultHeight = "0px";
    const [contentHeight, setContentHeight] = useState(defaultHeight);
    const [ref, { height }] = useMeasure();

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
      <animated.div style={expand} className="overflow-hidden">
        <div
          className="p-4 bg-gray-200 shadow-lg tracking-tight text-gray-600 text-sm"
          ref={ref}
        >
          <p className="uppercase text-center">
            How is the total cost calculated?
          </p>
          <ul>
            {displayName} has set:
            <li>- Price per second = {secondPrice} XMR</li>
            <li>- Price per character = {charPrice} XMR</li>
          </ul>
          <p className="text-xs uppercase tracking-tightes mt-3">
            Total Cost = (SecondPrice * Seconds) + (CharacterPrice * Characters)
          </p>
        </div>
      </animated.div>
    );
  }

  return (
    <div
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
    >
      <Answer isOpen={isShown} />
      <FiInfo className="ml-auto text-gray-700" />
    </div>
  );
}

export default InfoHover;
