import { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import PropTypes from "prop-types";
import monerojs from "../../libs/monero";

const Payment = ({ donor, message, subaddress, getSubaddress, total }) => {
  const [qrcode, setQrcode] = useState("");
  const [paymentUri, setPaymentUri] = useState(null);

  useEffect(() => {
    if (subaddress === null) {
      getSubaddress();
    }
  }, [getSubaddress, subaddress]);

  function createPaymentUri() {
    let uri;
    if (total > 0) {
      uri = "monero:" + subaddress + "?tx_amount=" + total;
    } else {
      uri = "monero:" + subaddress;
    }
    setPaymentUri(uri);
    return uri;
  }

  // generete QR Code on subaddress change
  useEffect(() => {
    const paymentUri = createPaymentUri();
    async function generateQrCode() {
      if (subaddress !== null) {
        const qrcode = await monerojs.generateQrCode(paymentUri);
        setQrcode(qrcode);
      }
    }
    generateQrCode();
  }, [subaddress, createPaymentUri]);

  function handleClick(e) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  }

  return (
    <div className="flex flex-grow flex-col justify-center items-center text-gray-200 text-center">
      <div className="m-4">
        {total ? (
          <span className="text-2xl">
            Please transfer at least {total} XMR to{" "}
          </span>
        ) : (
            <span className="text-2xl">Please transfer any amount of XMR to</span>
          )}
      </div>
      <img className="w-400px h-auto" src={qrcode} alt="qr code" />
      <a href={paymentUri} onClick={handleClick}>
        <div className="overlfow-x-auto break-all my-3 tracking-tight text-xs px-3">
          {subaddress}
        </div>
      </a>
      <div className="border-2 border-gray-200 rounded shadow-lg m-6 p-6">
        <h2>
          <span className="text-2xl">{donor}</span>, here is your message:{" "}
        </h2>
        <span className="text-left text-sm">{message}</span>
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
  total: PropTypes.number,
};

export default Payment;
