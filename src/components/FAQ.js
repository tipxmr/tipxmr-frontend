import React, { useState } from "react";
import Faqblock from "./dump_components/Faqblock";

function FAQ() {
  const faqs = [
    {
      question: "What is tipxmr.live?",
      answer:
        "tipxmr.live is a <span class='underline'>non-custodial service</span> that allows streamers to easily accept live donations in Monero.",
    },
    {
      question: "Why use tipxmr.live?",
      answer:
        "<p>A number of reasons make tipxmr.live an attractive alternative:</p><ul><li>1) Lower fees for streamers</li><li>2) Senders stay private</li><li>3) Independence from plattforms like YouTube, Twitch etc.</li></ul>",
    },
    {
      question: "What is Monero?",
      answer:
        "Monero is a privacy focused, open source cryptocurrency started in 2014. In many ways it works just like Bitcoin, however every Monero transaction hides the sender, reciever and transaction amount.<br>You can find out more about the Monero project on the <a href='https://www.getmonero.org/' class='text-xmrorange underline'>official Website</a>.",
    },
    {
      question: "Is tipxmr.live safe to use?",
      answer:
        "While tipxmr.live cannot guarantee your personal computer security, we ensure that the service is as safe as possible. For more information, read <a href='/disclaimer' class='underline text-xmrorange'>our disclaimer</a>.",
    },
  ];
  return (
    <div className="flex flex-grow justify-center">
      <div className="my-auto w-1/2">
        <div>
          <h2 className="text-3xl text-center underline mb-4">
            Frequently Asked Questions
          </h2>
        </div>
        <div>
          {faqs.map((faq, i) => (
            <Faqblock faq={faq} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FAQ;
