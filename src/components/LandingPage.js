import React, { useState } from "react";
import { Link } from "react-router-dom";

function LandingPage(props) {
  const [donor, setDonor] = useState("");
  const [message, setMessage] = useState("");

  function onClick() {
    props.onSubmit({ donor, message });
  }
  const streamerName = "StreamerName";
  return (
    <div className="flex flex-grow justify-center">
      <div className="my-auto">
        <h2 className="text-center text-3xl">
          <span role="img" aria-label="Green Money">
            💸
          </span>
          Donate to <span className="font-bold">{streamerName}</span> with
          Monero
          <span role="img" aria-label="Green Money">
            💸
          </span>
        </h2>
        <input
          type="text"
          align="middle"
          className="block w-1/2 text-center mx-auto mt-4 p-2 border border-8 border-gray-600"
          placeholder="Your Name"
          onChange={(e) => {
            setDonor(e.target.value);
          }}
        />
        <input
          type="text"
          className="block w-5/6 mx-auto text-center mt-4 p-2 border border-8 border-gray-600"
          placeholder="Your Message"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <div className="w-full flex justify-center">
          <Link to="/payment">
            <button
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={onClick}
            >
              Submit
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
