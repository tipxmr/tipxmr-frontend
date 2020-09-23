import React from "react";
export const faqs = [
  {
    question: "What is tipxmr.live?",
    answer: (
      <div>
        tipxmr.live is a<span className="underline">non-custodial service</span>
        that allows streamers to easily accept live donations in Monero.
      </div>
    ),
  },
  {
    question: "Why use tipxmr.live?",
    answer: (
      <div>
        A number of reasons make tipxmr.live an attractive alternative:
        <ul>
          <li>1. Lower fees for streamers</li>
          <li>2. Senders stay private</li>
          <li>3. Independence from plattforms like YouTube, Twitch etc.</li>
        </ul>
      </div>
    ),
  },
  {
    question: "What is Monero?",
    answer: (
      <div>
        Monero is a privacy focused, open source cryptocurrency started in 2014.
        In many ways it works just like Bitcoin, however every Monero
        transaction hides the sender, reciever and transaction amount.
        <br />
        You can find out more about the Monero project on the
        <a
          href="https://www.getmonero.org/"
          className="text-xmrorange underline"
        >
          official Website
        </a>
        .
      </div>
    ),
  },
  {
    question: "Is tipxmr.live safe to use?",
    answer: (
      <div>
        While tipxmr.live cannot guarantee your personal computer security, we
        ensure that the service is as safe as possible. For more information,
        read
        <a href="/disclaimer" className="underline text-xmrorange">
          our disclaimer
        </a>
        .
      </div>
    ),
  },
];
