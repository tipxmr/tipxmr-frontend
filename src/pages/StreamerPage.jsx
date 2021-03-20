import React, { useEffect, useState } from "react";
import { StreamerCard, CategoryNav } from "../components";
import socketio from "../libs/socket_donator";

// TODO render the category page with a filter
const StreamerPage = () => {
  // ----------- STATES FOR CATEGORY NAV -----------
  const [categories, setCategories] = useState([
    "all",
    "gaming",
    "politics",
    "talk",
    "XXX",
  ]);

  // TODO implement category pictures
  const [activeCategory, setActiveCategory] = useState("all");

  // ----------- STREAMERCARD -----------
  const [onlineStreamers, setOnlineStreamers] = useState(null);
  useEffect(() => {
    socketio.emitGetOnlineStreamers();
    socketio.onGetOnlineStreamer(setOnlineStreamers);
  }, []);

  const renderStreamerCards = () => {
    if (onlineStreamers && onlineStreamers.value) {
      return onlineStreamers.value.map((streamer) => {
        if (activeCategory === streamer.stream.category) {
          return (
            <StreamerCard key={streamer.displayName} streamer={streamer} />
          );
        } else if (activeCategory === "all") {
          return (
            <StreamerCard key={streamer.displayName} streamer={streamer} />
          );
        }
      });
    }
    return null;
  };
  return (
    <div className="flex">
      <CategoryNav
        activeCategory={activeCategory}
        stateSetter={setActiveCategory}
        categories={categories}
      />

      <div className="bg-xmrgray-darker m-16">{renderStreamerCards()}</div>
    </div>
  );
};
export default StreamerPage;
