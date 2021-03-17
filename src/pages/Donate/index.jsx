// @ts-nocheck
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { InfoHover } from "../../components";
import EnterMessage from "./EnterMessage";
import Payment from "./Payment";
import StreamerNotFound from "./StreamerNotFound";
import Success from "./Success";
import { Row, Col, Switch, Button } from "antd";
import "./index.less";

import socketio from "../../libs/socket_donator";

const Donate = () => {
  let { userName } = useParams();
  const [showEnterMessage, setShowEnterMessage] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showStreamerNotFound, setShowStreamerNotFound] = useState(false);
  const [amount, setAmount] = useState(null);

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
  const [subaddress, setSubaddress] = useState(null);
  const [donor, setDonor] = useState(null);
  const [message, setMessage] = useState("");
  const [showLivestream, setShowLivestream] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Get Streamer Info from Backend
    socketio.emitGetStreamer(userName);
    socketio.onRecieveStreamerFromBackend(setStreamer);
    socketio.onPaymentConfirmation(paymentConfirmation);
  }, [userName]);

  useEffect(() => {
    if (streamer === 0) {
      setShowStreamerNotFound(true);
      setShowPayment(false);
      setShowSuccess(false);
      setShowEnterMessage(false);
    } else {
      setShowStreamerNotFound(false);
      setShowPayment(false);
      setShowSuccess(false);
      setShowEnterMessage(true);
    }
  }, [streamer]);

  const paymentConfirmation = (confirmation) => {
    console.log("confirmation", confirmation);
    setAmount(confirmation.amount);
    setShowPayment(false);
    setShowSuccess(true);
  };

  const getSubaddress = () => {
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
    <Row justify="center" align="middle">
      <Col span={24}>
        {/* Toggle Livestream Preview / Online/Offline Button */}
        <Row justify="end" align="middle">
          <Col className="right-padding toggle-container">
            <div>
              <Switch
                defaultChecked
                onChange={() => setShowLivestream(!showLivestream)}
              ></Switch>
              <p className="inline left-padding right-padding toggle-container">
                Show Stream
              </p>
            </div>
            <Button
              type="text"
              shape="round"
              size="large"
              className={streamer.isOnline ? "button-online" : "button-offline"}
              onClick={() => console.log("Online")}
            >
              {streamer.isOnline ? "Online" : "Offline"}
            </Button>
          </Col>
        </Row>

        <Row justify="center" align="middle">
          {/* Livestream Preview with iframe */}
          {showLivestream ? (
            <Col span={8} className="right-padding">
              <div className="container">
                <iframe
                  className="responsive-iframe"
                  src="https://www.youtube.com/embed/5qap5aO4i9A"
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </Col>
          ) : null}

          {/* Donation Mask */}
          <Col span={8}>
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
                    displayName={streamer.displayName}
                    donor={donor}
                    message={message}
                    amount={amount}
                  />
                ) : null}
                {showStreamerNotFound ? <StreamerNotFound /> : null}
              </Col>
            </Row>
          </Col>
        </Row>
        {/* TODO Remove */}
        {/* <InfoHover */}
        {/*   displayName={streamer.displayName} */}
        {/*   secondPrice={streamer.secondPrice} */}
        {/*   charPrice={streamer.charPrice} */}
        {/* /> */}
      </Col>
    </Row>
  );
};

export default Donate;
