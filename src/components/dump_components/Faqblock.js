import React, { useState } from "react";

function Faqblock({ faq, style }) {
  const [isOpen, setIsOpen] = useState(false);
  function createAnswerMarkup(answer) {
    return { __html: answer };
  }

  function Question(question) {
    if (isOpen === true) {
      return (
        <div className="p-4 pl-8 text-xl text-white flex justify-between">
          <p>{question}</p>
          <span
            role="img"
            aria-label="arrow up"
            className="transition duration-500 ease-in-out transform rotate-180"
          >
            🔼
          </span>
        </div>
      );
    } else {
      return (
        <div className="p-4 pl-8 text-xl text-white flex justify-between">
          <p>{question}</p>
          <span role="img" aria-label="arrow down">
            🔽
          </span>
        </div>
      );
    }
  }

  function Answer(answer) {
    return (
      <div
        dangerouslySetInnerHTML={createAnswerMarkup(answer)}
        className="p-4 border-4 border-xmrgray-lighter bg-gray-200 border-t-0"
      ></div>
    );
  }

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className="bg-xmrgray-lighter my-3 transition duration-500"
    >
      {Question(faq.question)}
      {isOpen ? Answer(faq.answer) : ""}
    </div>
  );
}

export default Faqblock;
