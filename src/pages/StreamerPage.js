import React from "react";
import { StreamerCard } from "../components";
import PropTypes from "prop-types";

function StreamerPage({ testArray }) {
  console.log(testArray);
  return (
    <div className="w-3/4 mx-auto mt-3">
      <h2 className="underline text-center text-2xl mb-4">
        Streaming right now
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3">
        {testArray.map((streamer) => {
          console.log(streamer);
          return (
            <StreamerCard key={streamer.displayName} streamer={streamer} />
          );
        })}
      </div>
    </div>
  );
}
StreamerPage.propTypes = {
  testObject: PropTypes.array,
};

export default StreamerPage;
