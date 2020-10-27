import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { useTransition, animated } from "react-spring";
import { useRecoilValue } from "recoil";
import { streamerState } from "~/store/atom";
import {
  emitGetAnimationConfig,
  onGetAnimationConfig,
} from "~/libs/socket_animation";

function Animation() {
  const { userName } = useParams();
  const [animationConfig, setAnimationConfig] = useState();

  useEffect(() => {
    emitGetAnimationConfig(userName);
    onGetAnimationConfig(setAnimationConfig);
  }, [userName]);

  const streamerConfig = useRecoilValue(streamerState);

  // old states for the streamer animation
  // in milliseconds, one second costs 0.00043 xmr
  // const timeout = 1000 / streamerConfig.animationSettings.secondPrice;
  // const fontcolor = streamerConfig.animationSettings.fontColor;
  // const goalprogress = streamerConfig.animationSettings.goalProgress;
  // const sound = streamerConfig.animationSettings.sound;
  // const goal = streamerConfig.animationSettings.goal;
  // const [donor, setDonor] = useState("AlexAnarcho");
  // const [amount, setAmount] = useState(0.0172);
  // const [message, setMessage] = useState("Testing things out");
  // const [showMessage, setShowMessage] = useState(false);
  // const messageTransitions = useTransition(showMessage, null, {
  //   from: { opacity: 0 },
  //   enter: { opacity: 1 },
  //   leave: { opacity: 0 },
  // });
  // const Sound = () => {
  //   return <audio src={sound} autoPlay={true}></audio>;
  // };

  console.log("streamerConfig for animation: ", animationConfig);
  // function dismountMessage() {
  //   setTimeout(() => setShowMessage(false), timeout * amount);
  // }
  return (
    <div
    /* className="flex flex-grow justify-center bg-opacity-0" */
    /* onClick={() => { */
    /*   setShowMessage(!showMessage); */
    /*   dismountMessage(); */
    /* }} */
    >
      {" "}
      Hi there
      {/* <div */}
      {/*   className="my-auto text-4xl text-center" */}
      {/*   /\* style={{ color: fontcolor }} *\/ */}
      {/* > */}
      {/*   {messageTransitions.map( */}
      {/*     ({ item, key, props }) => */}
      {/*       item && ( */}
      {/*         <animated.div key={key} style={props}> */}
      {/*           <Sound /> */}
      {/*           <p> */}
      {/*             {donor} donated {amount} XMR */}
      {/*           </p> */}
      {/*           <p>{message}</p> */}
      {/*           <p className="text-xl"> */}
      {/*             Goal: {goalprogress + amount}/{goal} XMR */}
      {/*           </p> */}
      {/*         </animated.div> */}
      {/*       ) */}
      {/*   )} */}
      {/* </div> */}
    </div>
  );
}

Animation.propTypes = {
  streamerConfig: PropTypes.object,
};

export default Animation;
