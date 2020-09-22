import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import clsx from "clsx";
import { FcExpand } from "react-icons/fc";

function Faqblock({ question, children }) {
  const [isOpen, setIsOpen] = useState(false);
  function createAnswerMarkup(answer) {
    return { __html: answer };
  }

  function Question(question) {
    const arrowStyles = clsx([
      "transition",
      "transform",
      "duration-500",
      "ease-in-out",
      {
        "rotate-180": isOpen,
      },
    ]);

    return (
      <div className="p-4 pl-8 text-xl text-white flex justify-between">
        <p>{question}</p>
        <FcExpand className={arrowStyles} />
      </div>
    );
  }

  function Answer(answer) {
    return (
      <animated.div className="p-4 border-4 border-xmrgray-lighter bg-gray-200 border-t-0">
        {children}
      </animated.div>
    );
  }

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
