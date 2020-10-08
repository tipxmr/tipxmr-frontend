import React, { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import PropTypes from "prop-types";
import monerojs from "~/libs/monero";
import clsx from "clsx";

function Payment({ donor, message, subaddress, getSubaddress, total }) {
  const [qrcode, setQrcode] = useState("");

  useEffect(() => {
    if (subaddress === null) {
      getSubaddress();
    }
  }, [getSubaddress, subaddress]);

  // generete QR Code on subaddress change
  useEffect(() => {
    async function generateQrCode() {
      if (subaddress !== null) {
        const qrcode = await monerojs.generateQrCode(subaddress);
        setQrcode(qrcode);
      }
    }
    generateQrCode();
  }, [subaddress]);

  function handleClick(e) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  }

  const grayTextStyle = clsx(["text-2xl text-gray-600"]);

  return (
    <div className="flex flex-grow flex-col justify-center items-center text-center">
      <div className="m-4">
        {total ? (
          <span className={grayTextStyle}>Please transfer {total} XMR to </span>
        ) : (
          <span className={grayTextStyle}>
            Please transfer any amount of XMR to
          </span>
        )}
      </div>
      <img className="w-400px h-auto" src={qrcode} alt="qr code" />
      <a href={"monero:" + subaddress} onClick={handleClick}>
        <div className="overlfow-x-auto break-all tracking-tight text-xs px-3">
          {subaddress}
        </div>
      </a>
      <div className="border-4 rounded shadow-lg bg-gray-200 my-6 p-6">
        <h2 className={grayTextStyle}>Your message: </h2>
        <span className="text-left">{message}</span>
      </div>
      <ReactLoading type="spinningBubbles" color="#F16822" />
    </div>
  );
}
// Payment property types
Payment.propTypes = {
  message: PropTypes.string,
  donor: PropTypes.string,
  subaddress: PropTypes.string,
  getSubaddress: PropTypes.func,
  total: PropTypes.func,
};

export default Payment;
