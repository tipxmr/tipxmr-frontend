import React, { useState, useEffect } from "react";
import { Toggle, Button } from "~/components";
import QR from "~/images/test-qr.png";

function Payment() {
  const [yearly, setYearly] = useState(true);
  const [monthly, setMonthly] = useState(false);
  const [isPremium, setIsPremium] = useState(true);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const basePrice = isPremium ? 0.09 : 0.009;
    const factor = yearly ? 11 : 1;
    setAmount(basePrice * factor);
  }, [monthly, yearly, isPremium]);

  // Hard Coded for testing
  const [address, setAddress] = useState(
    "45ZoRheLkX2H3UjYSFs2wP9yo739nQ7irZA2pX6MQr5FeebkC2n8hABYGQRCcrzJ2AaGbNUyR4EfvanP1G2H5DSrMWi97Sk"
  );
  const [qrCode, setQrCode] = useState(QR);

  function activateLeft() {
    setYearly(true);
    setMonthly(false);
  }

  function activateRight() {
    setYearly(false);
    setMonthly(true);
  }

  function handleToggle() {
    setIsPremium(!isPremium);
  }

  return (
    <div className="text-center">
      <h1 className="mt-6 text-4xl text-center">tipxmr invoice is due</h1>
      <p>
        To keep using tipxmr for 1 {yearly ? "year" : "month"}, send{" "}
        {amount.toFixed(4)} XMR to
      </p>
      <div className="flex justify-center mt-4">
        <Button active={yearly} onClick={activateLeft}>
          1 year
        </Button>
        <Button active={monthly} onClick={activateRight}>
          1 month
        </Button>
      </div>
      <div className="flex justify-center items-cente mt-3">
        <Toggle isChecked={isPremium} onClick={handleToggle} />
        <span className="mx-4 text-xmrgray-darker">Get Premium</span>
      </div>
      {/* <p className="tracking-tight text-sm"> */}
      {/*   One year will get you one month for free */}
      {/* </p> */}
      <div>
        <div className="flex justify-center my-6">
          <img src={qrCode} alt="QR Code" />
        </div>
        <p className="text-xs">{address}</p>
      </div>
      <div className="mt-4 border-t-2 border-dotted border-xmrgray-darker">
        <p className="mt-2">
          If you have the funds, you can pay directly with your tipxmr wallet
        </p>
        <div className="mt-2 flex justify-center">
          <Button>Pay with tipxmr wallet</Button>
        </div>
      </div>
    </div>
  );
}

function Success() {
  return (
    <div className="text-center text-xmrgray-darker">
      <h1 className="text-4xl">We got your payment!</h1>
      <h2 className="text-4xl">🤙✅🙏</h2>
      <h2 className="mt-4 text-2xl">Thank you for using our service!</h2>
      <div className="flex justify-center mt-6 pt-6 border-t-2 border-dashed border-xmrgray-darker">
        <Button>Continue to dashboard</Button>
      </div>
    </div>
  );
}

function Invoice() {
  const [isPayed, setIsPayed] = useState(true);
  return (
    <div className="flex flex-grow self-center justify-center">
      <div className="bg-gray-200 text-xmrgray-darker rounded">
        <div className="rounded border-4 border-dashed border-xmrorange p-10 m-6">
          {isPayed ? <Success /> : <Payment />}
        </div>
      </div>
    </div>
  );
}

export default Invoice;

// TODO let the user choose between basic and premium
// TODO integrate the subaddress from a different wallet
// TODO confirmation on payment
// TODO continue button one payment is confirmed
// TODO integrate with backend (generate subaddress, confirm payment, confirm amount)
// TODO update the db to the new date
// TODO backend function to check if invoice is due on user login
