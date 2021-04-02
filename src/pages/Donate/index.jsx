// @ts-nocheck
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { IsOnlineBadge, Toggle, InfoHover } from "../../components";
import EnterMessage from "./EnterMessage";
import Payment from "./Payment";
import StreamerNotFound from "./StreamerNotFound";
import Success from "./Success";

// import socketio from "../../libs/socket_donator";
import { useAppDispatch, useAppSelector } from "../../store";
import { requestStreamer, requestSubaddress } from "../../store/slices/donor";

function Donate() {
  let { userName } = useParams();
  const [showEnterMessage, setShowEnterMessage] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showStreamerNotFound, setShowStreamerNotFound] = useState(false);
  const [amount, setAmount] = useState(null);

  const streamer = useAppSelector(state => state.donor.streamer);
  const subaddress = useAppSelector(state => state.donor.subaddress);
  const confirmation = useAppSelector(state => state.donor.payment.confirmation);
  const dispatch = useAppDispatch();

  const [donor, setDonor] = useState(null);
  const [message, setMessage] = useState("");
  const [showLivestream, setShowLivestream] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    dispatch(requestStreamer(userName));
  }, [dispatch, userName]);

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
    <div className="flex flex-grow justify-center items-center relative">
      {showLivestream ? (
        <div className="flex-4 h-full">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/5qap5aO4i9A"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ) : null}
      <div className="flex-2">
        <div className="absolute top-0 right-0 m-3 text-gray-200 flex flex-col justify-center">
          <Toggle
            isChecked={showLivestream}
            onClick={() => setShowLivestream(!showLivestream)}
          >
            Watch the stream
          </Toggle>
          <div className="mt-3 mx-auto">
            <IsOnlineBadge isOnline={streamer.isOnline} />
          </div>
        </div>
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
        <div className="m-2 absolute bottom-0 right-0">
          <InfoHover
            displayName={streamer.displayName}
            secondPrice={streamer.secondPrice}
            charPrice={streamer.charPrice}
          />
        </div>
      </div>
    </div>
  );
}
export default Donate;
