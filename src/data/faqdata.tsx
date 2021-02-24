//@ts-nocheck
import React from "react";

const linkStyle = "text-xmrorange underline";
export const faqs = [
  {
    question: "What is tipxmr.live?",
    answer: (
      <div>
        tipxmr.live is a{" "}
        <span className="underline">non-custodial service</span> that allows
        streamers to easily accept live donations in Monero.
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
        In many ways it works just like Bitcoin, however, every Monero
        transaction hides the sender, reciever and transaction amount.
        <br />
        We suggest you start learning about the{" "}
        <a className={linkStyle} href="https://www.monero.how/">
          basics of Monero
        </a>{" "}
        can find out more about the Monero project on the{" "}
        <a href="https://www.getmonero.org/" className={linkStyle}>
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
        read{" "}
        <a href="/disclaimer" className={linkStyle}>
          our disclaimer
        </a>
        .
      </div>
    ),
  },
  {
    question: "How does tipxmr.live work in detail?",
    answer: (
      <div>
        tipxmr.live provides a full Monero wallet in the browser via
        WebAssembly. The streamer has to have a browser tab open and be logged
        in to the service to recieve donations. This provides a non-custodial,
        yet intuitive user experience.
      </div>
    ),
  },
  {
    question: "Is tipxmr.live legal to use?",
    answer: (
      <div>
        The answer to the legality question cannot be answered genereally.
        However, all that tipxmr.live provides is a browser-based wallet and an
        automated process for streamers and donators. If XMR is legal in your
        country, tipxmr.live is as well.
      </div>
    ),
  },
  {
    question: "Do platforms allow me to use tipxmr.live?",
    answer: (
      <div>
        Since tipxmr.live integrates directly into OBS, the donations are
        encoded in the video feed when streaming. Donations can be made from
        tipxmr.live directly, which is independant of any platform.
        <br />
        We cannot guarantee that big platforms will take no action against
        accounts using tipxmr.live.
      </div>
    ),
  },
  {
    question: "What do I need to get started with tipxmr.live?",
    answer: (
      <div>
        What you need:
        <ul>
          <li>
            1.{" "}
            <a href="https://obsproject.com/" className={linkStyle}>
              OBS
            </a>
          </li>
          <li>
            2. An account on a streaming platform (i.e. YouTube, Twitch.tv etc.)
          </li>
          <li>
            3. A Monero Wallet (you can create one directly with tipxmr.live)
          </li>
        </ul>
        <p>
          Follow our step-by-step guide to get started in just a few minutes!
        </p>
      </div>
    ),
  },
];
