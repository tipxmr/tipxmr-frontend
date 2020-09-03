import React from "react";
import testqr from "../images/test-qr.png";
import ReactLoading from "react-loading";

function Payment(props) {
  const amount = "1337";
  const address = "l;kajdsflkjsdaf;l";
  return (
    <div className="flex flex-grow justify-center text-center">
      <div className="text-center my-auto">
        <span className="text-3xl">{props.donor},</span>
        <br /> send <span className="">{amount} XMR</span> to
        <img className="mx-auto w-270px h-auto" src={testqr} alt="qr code" />
        <pre className="text-center overlfow-x-auto text-xs">{address}</pre>
        <h2 className="mt-4">Your Message will be:</h2>
        <span className="italic">{props.message}</span>
        <div className="flex justify-center mt-6">
          <ReactLoading type="spinningBubbles" color="#F16822" />
        </div>
      </div>
    </div>
  );
}

export default Payment;
