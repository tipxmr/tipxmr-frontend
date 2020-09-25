import React, { useEffect, useState } from "react";
import { StreamerCard } from "../components";
import socketio from "../libs/socket";

function StreamerPage() {
  const [onlineStreamers, setOnlineStreamers] = useState(null);
  useEffect(() => {
    socketio.emitGetOnlineStreamers();
    socketio.onGetOnlineStreamer(setOnlineStreamers);
  }, []);

  function renderStreamerCards() {
    if (onlineStreamers) {
      return onlineStreamers.map((streamer) => {
        console.log("Streamer:", streamer);
        return <StreamerCard key={streamer.displayName} streamer={streamer} />;
      });
    }
    return null;
  }
  return (
    <div className="w-3/4 mx-auto mt-3">
      <h2 className="underline text-center text-2xl mb-4">
        Streaming right now
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3">
        {renderStreamerCards()}
      </div>
    </div>
  );
}
export default StreamerPage;
