// @ts-nocheck
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EnterMessage from "./EnterMessage";
import Payment from "./Payment";
import NotFound404 from "../NotFound404";
import Success from "./Success";
import { Row, Col, Switch } from "antd";
import "./Donate.less";
import "../../styles/index.less";
import { IsOnlineBadge } from "../../components";

// import socketio from "../../libs/socket_donator";
import { useAppDispatch, useAppSelector } from "../../store";
import { requestStreamer, requestSubaddress } from "../../store/slices/donor";

const Donate = () => {
  let { userName } = useParams();
  const [showEnterMessage, setShowEnterMessage] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showStreamerNotFound, setShowStreamerNotFound] = useState(false);
  const [amount, setAmount] = useState(null);
  const [donor, setDonor] = useState(null);
  const [message, setMessage] = useState("");
  const [showLivestream, setShowLivestream] = useState(false);
  const [total, setTotal] = useState(0);

  const streamer = useAppSelector(state => state.donor.streamer);
  const subaddress = useAppSelector(state => state.donor.subaddress);
  const confirmation = useAppSelector(state => state.donor.payment.confirmation);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(requestStreamer(userName));
  }, [dispatch, userName]);

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
      setShowSuccess(false);
      setShowEnterMessage(true);
    }
  }, [streamer]);

  useEffect(() => {
    if (confirmation) {
      console.log("confirmation", confirmation);
      setAmount(confirmation.amount);
      setShowPayment(false);
      setShowSuccess(true);
    }
  }, [confirmation]);

  function getSubaddress() {
    dispatch(requestSubaddress(
      streamer.displayName,
      streamer.userName,
      streamer._id,
      donor,
      message
    ));
  }

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
