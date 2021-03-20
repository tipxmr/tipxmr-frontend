// @ts-nocheck
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EnterMessage from "./EnterMessage";
import Payment from "./Payment";
import NotFound404 from "../NotFound404";
import Success from "./Success";
import { Row, Col, Switch } from "antd";
import "./index.less";
import { IsOnlineBadge } from "../../components";

import socketio from "../../libs/socket_donator";

const Donate = () => {
  let { userName } = useParams();
  const [showEnterMessage, setShowEnterMessage] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showStreamerNotFound, setShowStreamerNotFound] = useState(false);
  const [amount, setAmount] = useState(null);
  const [donor, setDonor] = useState(null);
  const [message, setMessage] = useState("");
  const [showLivestream, setShowLivestream] = useState(true);
  const [total, setTotal] = useState(0);

  // propably not needed in the donate
  const [streamer, setStreamer] = useState({
    displayName: "loading",
    userName: "loading",
    isOnline: false,
    _id: "",
    secondPrice: 0,
    charPrice: 0,
    charLimit: 100,
    minAmount: 0.0004,
    gifsMinAmount: 0,
    goalProgress: 0,
    goal: 1,
    goalReached: false,
    streamUrl: "",
    streamPlatform: "",
    streamLanguage: "",
    streamDescription: "",
    streamCategory: "",
  });
  // const [subaddress, setSubaddress] = useState(null); // commented out for testing purposes
  const [subaddress, setSubaddress] = useState(
    "555RneqFCh7Xe7bR93vNs1RK6mNASHPtfABzqHnCQx3UX2tNvU8ppbMb4z5ixK2A4of48VyEfQ2sL2vtAh8jt1RsJAg6zQD"
  ); // for testing

  useEffect(() => {
    // Get Streamer Info from Backend
    socketio.emitGetStreamer(userName);
    socketio.onRecieveStreamerFromBackend(setStreamer);
    socketio.onPaymentConfirmation(paymentConfirmation);
  }, [userName]);

  useEffect(() => {
    // Rendering the different page components of a donation
    if (streamer === 0) {
      setShowStreamerNotFound(true);
      setShowPayment(false);
      setShowSuccess(false);
      setShowEnterMessage(false);
    } else {
      setShowStreamerNotFound(false);
      setShowPayment(false);
      setShowSuccess(true);
      setShowEnterMessage(false);
    }
  }, [streamer]);

  const paymentConfirmation = (confirmation) => {
    console.log("confirmation", confirmation);
    setAmount(confirmation.amount);
    setShowPayment(false);
    setShowSuccess(true);
  };

  const getSubaddress = () => {
    // Does not appear to be working properly
    socketio.emitGetSubaddress(
      streamer.displayName,
      streamer.userName,
      streamer._id,
      donor,
      message
    );
    socketio.onSubaddressToDonator(setSubaddress);
  };

  return (
    <Row justify="center" align="middle" gutter={[0, 48]}>
      {/* Toggle Livestream Preview / Online/Offline Button */}
      <Col span={6} offset={18} className="gutter-row">
        <Row justify="center" align="middle">
          <Switch
            defaultChecked
            onChange={() => setShowLivestream(!showLivestream)}
            style={{ marginRight: "5px" }}
          ></Switch>
          <span>Show Stream</span>
        </Row>
        <Row justify="center" align="middle">
          <IsOnlineBadge isOnline={streamer.isOnline} />
        </Row>
      </Col>

      <Col span={24} className="gutter-row">
        {/* Livestream Preview with iframe */}
        <Row justify="center" align="middle">
          {showLivestream ? (
            <Col span={8}>
              <div className="iframe-container">
                <iframe
                  className="responsive-iframe"
                  src="https://www.youtube.com/embed/5qap5aO4i9A" /* for testing */
                  /* src={streamer.streamUrl} /\* for individual streams *\/ */
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </Col>
          ) : null}

          {/* Message Form, Payment & Success */}
          <Col span={8} offset={3}>
            <Row justify="center" align="middle">
              <Col>
                {showEnterMessage ? (
                  <EnterMessage
                    donor={donor}
                    setDonor={setDonor}
                    setMessage={setMessage}
                    setShowEnterMessage={setShowEnterMessage}
                    setShowPayment={setShowPayment}
                    displayName={streamer.displayName}
                    secondPrice={streamer.secondPrice}
                    charLimit={streamer.charLimit}
                    charPrice={streamer.charPrice}
                    stream={streamer.stream}
                    total={total}
                    setTotal={setTotal}
                    message={message}
                    goal={streamer.goal}
                    goalReached={streamer.goalReached}
                    streamUrl={streamer.streamUrl}
                    streamPlatform={streamer.streamPlatform}
                    streamLanguage={streamer.streamLanguage}
                    streamDescription={streamer.streamDescription}
                    streamCategory={streamer.streamCategory}
                  />
                ) : null}
                {showPayment ? (
                  <Payment
                    displayName={streamer.displayName}
                    donor={donor}
                    message={message}
                    subaddress={subaddress}
                    getSubaddress={getSubaddress}
                    total={total}
                  />
                ) : null}
                {showSuccess ? (
                  <Success
                    setShowSuccess={setShowSuccess}
                    setShowEnterMessage={setShowEnterMessage}
                    message={message}
                    donor={donor}
                    total={total}
                  />
                ) : null}
                {showStreamerNotFound ? <NotFound404 /> : null}
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Donate;
