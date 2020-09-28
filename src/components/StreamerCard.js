import React from "react";
import PropTypes from "prop-types";
import { FaTwitch, FaYoutube } from "react-icons/fa";
import tipxmr from "../images/tipxmr-button.png";
import { Link } from "react-router-dom";

const iconLookup = {
  youtube: FaYoutube,
  twitch: FaTwitch,
};

function StreamIcon({ type }) {
  const Icon = iconLookup[type];
  return <Icon />;
}
StreamIcon.propTypes = {
  type: PropTypes.oneOf(["youtube", "twitch"]),
};

function Funding({ streamer }) {
  if (streamer.showGoal === true) {
    return (
      <div className="px-2 text-sm mb-4">
        <span className="tracking-wide">Funding:</span>

        <span className="tracking-tight">
          {streamer.goalProgress} of {streamer.goal}XMR
        </span>
      </div>
    );
  }
  return null;
}
Funding.propTypes = {
  streamer: PropTypes.object,
};

function StreamerCard({ streamer }) {
  return (
    <div className="mx-4">
      <div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden my-4">
        <img
          className="w-full h-56 object-cover object-center"
          src="https://i.imgur.com/PW3XO3u.jpg"
          alt="avatar"
        />
        <div className="py-4 px-6">
          <a href={streamer.stream.url}>
            <div className="flex justify-center items-center transform hover:scale-110">
              <StreamIcon type={streamer.stream.platform} />
              <h1 className="mx-5 text-2xl text-xmrgray-darker">
                {streamer.displayName}
              </h1>
              <p>{streamer.stream.language}</p>
            </div>
          </a>
          <div className="p-3 my-4 rounded bg-gray-200 text-xmrgray-darker shadow-md">
            <p className="p-2">{streamer.stream.description}</p>

            <Funding streamer={streamer} />
            <div className="flex justify-center">
              <span className="px-2 py-1 text-xs tracking-wide rounded-full bg-xmrgray-darker text-gray-200">
                #{streamer.stream.category}
              </span>
            </div>
          </div>
          <div className="text-center w-full mx-auto my-auto text-gray-700">
            <Link to={"/donate/" + streamer.userName}>
              <img
                src={tipxmr}
                className="mx-auto h-auto w-32 shadow-md rounded transform hover:scale-110"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

StreamerCard.propTypes = {
  streamer: PropTypes.object,
};

export default StreamerCard;
