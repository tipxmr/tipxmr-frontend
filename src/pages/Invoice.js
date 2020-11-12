import React, { useState } from "react";
import { Toggle } from "~/components";
import QR from "~/images/test-qr.png";

function Invoice() {
  const [amount, setAmount] = useState("0.00042");
  const [address, setAddress] = useState(
    "45ZoRheLkX2H3UjYSFs2wP9yo739nQ7irZA2pX6MQr5FeebkC2n8hABYGQRCcrzJ2AaGbNUyR4EfvanP1G2H5DSrMWi97Sk"
  );
  const [qrCode, setQrCode] = useState(QR);

  return (
    <div className="flex self-center justify-center">
      <div className="m-6 p-10 bg-gray-200 text-xmrgray-darker rounded border-4 border-xmrorange">
        <h1 className="mt-6 text-4xl text-center">tipxmr invoice is due</h1>
        <p>
          In order to keep using the tipxmr.live service, please send {amount}{" "}
          XMR to
        </p>
        <div className="flex justify-center my-6">
          <img src={qrCode} alt="QR Code" />
        </div>

        <p className="text-xs">{address}</p>
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
