import React from "react";
import { Faqblock } from "../components";
import { faqs } from "../data/faqdata";

function FAQ() {
  return (
    <div className="flex flex-grow justify-center text-gray-200">
      <div className="my-auto w-5/6 lg:w-1/2">
        <div>
          <h2 className="text-3xl text-center underline mb-4">
            Frequently Asked Questions
          </h2>
        </div>
        <div>
          {faqs.map((faq, i) => (
            <Faqblock question={faq.question} key={i}>
              {faq.answer}
            </Faqblock>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FAQ;
