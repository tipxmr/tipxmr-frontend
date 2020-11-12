import React, { useState } from "react";
import { Button } from "~/components";
import QR from "~/images/test-qr.png";

function Invoice() {
  const [activeButtonLeft, setActiveButtonLeft] = useState(true);
  const [activeButtonRight, setActiveButtonRight] = useState(false);

  const [amount, setAmount] = useState("0.009");
  const [address, setAddress] = useState(
    "45ZoRheLkX2H3UjYSFs2wP9yo739nQ7irZA2pX6MQr5FeebkC2n8hABYGQRCcrzJ2AaGbNUyR4EfvanP1G2H5DSrMWi97Sk"
  );
  const [qrCode, setQrCode] = useState(QR);

  function activateLeft() {
    setActiveButtonLeft(true);
    setActiveButtonRight(false);
  }

  function activateRight() {
    setActiveButtonLeft(false);
    setActiveButtonRight(true);
  }

  return (
    <div className="flex flex-grow self-center justify-center">
      <div className="bg-gray-200 text-xmrgray-darker rounded">
        <div className="rounded border-4 border-dashed border-xmrorange p-10 m-6">
          <div className="text-center">
            <h1 className="mt-6 text-4xl text-center">tipxmr invoice is due</h1>
            <p>
              To keep using tipxmr for 1 {activeButtonLeft ? "year" : "month"},
              send {activeButtonLeft ? (amount * 11).toFixed(4) : amount} XMR to
            </p>
            <div className="flex justify-center mt-4">
              <Button active={activeButtonLeft} onClick={activateLeft}>
                1 year
              </Button>
              <Button active={activeButtonRight} onClick={activateRight}>
                1 month
              </Button>
            </div>
            <p className="tracking-tight text-sm">
              One year will get you one month for free
            </p>

            <div className="flex justify-center my-6">
              <img src={qrCode} alt="QR Code" />
            </div>

            <p className="text-xs">{address}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Invoice;

// TODO let the user choose between time intervals (week/month/year)
// TODO let the user choose between basic and premium
// TODO integrate the subaddress from a different wallet
// TODO confirmation on payment
// TODO continue button one payment is confirmed
// TODO integrate with backend (generate subaddress, confirm payment, confirm amount)
// TODO update the db to the new date
// TODO backend function to check if invoice is due on user login
