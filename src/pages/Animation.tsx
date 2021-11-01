import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { useTransition, animated } from "react-spring";
import {
  emitGetAnimationConfig,
  onGetAnimationConfig,
} from "../libs/socket_animation";
import clsx from "clsx";

function GoalBar({ goalProgress, goal, percentage }) {
  const barStyle = clsx([
    "bg-xmrorange",
    "text-xs",
    "leading-none",
    "py-1",
    "text-center",
    "text-white",
    "h-6",
  ]);
  return (
    <div className="my-3 w-64 mx-auto">
      <p className="text-xl text-center">
        {(goalProgress / goal) * 100}% <span className="text-sm">reached</span>{" "}
        ({goalProgress}/{goal} XMR)
      </p>

      <div className="mx-auto">
        <div className="shadow-lg bg-gray-700">
          <div className={barStyle} style={{ width: percentage }}></div>
        </div>
      </div>
    </div>
  );
}

function Sound({ sound }) {
  return <audio src={sound} autoPlay={true}></audio>;
}

function Animation() {
  const { userName } = useParams();
  const [animationConfig, setAnimationConfig] = useState();
  const [time, setTime] = useState(0);
  const [fontColor, setFontColor] = useState(null);
  const [fontSize, setFontSize] = useState(null);
  const [fontShadow, setFontShadow] = useState(false);
  const [showGoal, setShowGoal] = useState(false);
  const [goalProgress, setGoalProgress] = useState(0);
  const [sound, setSound] = useState(null);
  const [goal, setGoal] = useState(0);

  const [donor, setDonor] = useState("Grischa");
  const [amount, setAmount] = useState(12);
  const [message, setMessage] = useState(
    "Danke Prolex, dass du mir immer wieder den richtigen Weg bei React zeigst!"
  );
  const [showMessage, setShowMessage] = useState(false);

  const percentage = (goalProgress / goal) * 100;
  const percentageString = percentage + "%";

  useEffect(() => {
    emitGetAnimationConfig(userName);
    onGetAnimationConfig(setAnimationConfig);
  }, [userName]);

  useEffect(() => {
    if (animationConfig) {
      setTime(1000 / animationConfig.secondPrice);
      setFontColor(animationConfig.fontColor);
      setFontSize(animationConfig.fontSize);
      setFontShadow(animationConfig.fontShadow);
      setShowGoal(animationConfig.showGoal);
      setGoalProgress(animationConfig.goalProgress);
      setSound(animationConfig.sound);
      setGoal(animationConfig.goal);
      setTimeout(() => {
        setGoalProgress((prevState) => prevState + amount);
      }, 2000);
    }
  }, [animationConfig, amount]);

  // const streamerConfig = useRecoilValue(streamerState);
  // console.log("Animation streamer config: ", streamerConfig);

  const messageTransitions = useTransition(showMessage, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  function dismountMessage() {
    setTimeout(() => setShowMessage(false), time * amount);
  }

  // TODO create a template for the most basic donation
  // TODO implement the goal, show only if the config says so

  const animationStyle = clsx([fontSize]);
  const styleObject = {
    color: fontColor, // textShadow: "2px 2px #000000"
  };

  return (
    <div
      className="mx-auto bg-opacity-0"
      onClick={() => {
        setShowMessage(!showMessage);
        dismountMessage();
      }}
    >
      <div>
        {showGoal ? (
          <GoalBar
            goalProgress={goalProgress}
            goal={goal}
            percentage={percentageString}
          />
        ) : (
          ""
        )}
      </div>
      <div className="my-auto text-4xl text-center">
        {messageTransitions.map(
          ({ item, key, props }) =>
            item && (
              <animated.div key={key} style={props}>
                {sound ? <Sound sound={sound} /> : ""}
                <div className={animationStyle} style={styleObject}>
                  <p>
                    {donor} <span className="text-lg">donated</span> {amount}{" "}
                    XMR
                  </p>
                  <p className="max-w-screen-md text-center text-xl">
                    {message}
                  </p>
                </div>
              </animated.div>
            )
        )}
      </div>
    </div>
  );
}

Animation.propTypes = {
  streamerConfig: PropTypes.object,
};

export default Animation;
