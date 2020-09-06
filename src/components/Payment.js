import React, { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import PropTypes from "prop-types";
import monerojs from "../libs/monero";
import { Link } from "react-router-dom";

function Payment({ message, donor, createSubaddress }) {
  const [subaddress, setSubaddress] = useState(null);
  const [qrcode, setQrcode] = useState("");

  useEffect(() => {
    createSubaddress()
      .then((subaddress) => {
        setSubaddress(subaddress);
        return subaddress;
      })
      .then((subaddress) => {
        return monerojs.generateQrCode(subaddress);
      })
      .then((qrcode) => {
        setQrcode(qrcode);
        console.log("qrcode:", qrcode);
      });
  }, []);

  return (
    <div className="flex flex-grow justify-center text-center">
      <div className="text-center my-auto">
        <span className="text-2xl">
          Hey {donor}, send any amount of Monero (XMR) to
        </span>
        <br />
        <img className="mx-auto w-400px h-auto" src={qrcode} alt="qr code" />
        <a href={"monero:" + subaddress}>
          <pre className="text-center overlfow-x-auto text-xs">
            {subaddress}
          </pre>
        </a>
        <h2 className="mt-4">Your Message will be:</h2>
        <span className="italic">{message}</span>
        <div className="flex justify-center mt-6">
          <ReactLoading type="spinningBubbles" color="#F16822" />
        </div>
      </div>
    </div>
  );
}
// Payment property types
Payment.propTypes = {
  message: PropTypes.string,
  donor: PropTypes.string,
  createSubaddress: PropTypes.func,
};

export default Payment;
