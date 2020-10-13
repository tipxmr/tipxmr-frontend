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

// function Funding({ streamer }) {
//   if (streamer) {
//     console.log("funding: ", streamer);
//     return (
//       <div className="px-2 text-sm mb-4">
//         <span className="tracking-wide">Funding:</span>

//         <span className="tracking-tight">
//           {streamer.goalProgress} of {streamer.goal}XMR
//         </span>
//       </div>
//     );
//   }
//   return null;
// }
// Funding.propTypes = {
//   streamer: PropTypes.object,
// };

function StreamerCard({ streamer }) {
  return (
    <div className="mx-4">
      <div className="max-w-xs bg-xmrgray-darker shadow-xl rounded-lg overflow-hidden">
        <div className="flex flex-grow justify-center">
          <img
            className="object-cover object-center"
            src="https://i.imgur.com/PW3XO3u.jpg"
            alt="avatar"
          />
        </div>
        <div className="flex flex-grow flex-col p-6">
          <a href={streamer.stream.url}>
            <div className="flex justify-center items-center transform hover:scale-110">
              <StreamIcon type={streamer.stream.platform} />
              <h1 className="text-2xl text-gray-200 mx-5">
                {streamer.displayName}
              </h1>
              <p>{streamer.stream.language}</p>
            </div>
          </a>
          <div className="mx-auto">
            <span className="px-2 py-1 text-xs tracking-wide rounded-full border border-gray-200 text-gray-200">
              #{streamer.stream.category}
            </span>
          </div>

          <p className="p-2 truncate text-sm">{streamer.stream.description}</p>
          {/* <Funding streamer={streamer} /> */}
          <Link to={"/donate/" + streamer.userName}>
            <img
              src={tipxmr}
              className="mx-auto h-auto w-32 shadow-md rounded transform hover:scale-110"
            />
          </Link>
        </div>
        <div className="text-center w-full mx-auto my-auto text-gray-200"></div>
      </div>
    </div>
  );
}

StreamerCard.propTypes = {
  streamer: PropTypes.object,
};

export default StreamerCard;
