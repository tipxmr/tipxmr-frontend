import React from "react";
import testqr from "../images/test-qr.png";
import ReactLoading from "react-loading";

function Payment(props) {
  const amount = "1337";
  return (
    <div className="mt-24 text-center">
      <span className="font-black">{props.donor}</span>
      <br /> send <span className="font-black">{amount} XMR</span> to
      <img className="mx-auto w-270px h-auto" src={testqr} alt="qr code" />
      <pre className="text-center overlfow-x-auto text-xs">{}</pre>
      <h2 className="mt-4 font-semibold">Your Message will be:</h2>
      <span className="italic">{props.message}</span>
      <div className="flex justify-center mt-6">
        <ReactLoading type="spinningBubbles" color="#F16822" />
      </div>
    </div>
  );
}

export default Payment;
