import React, { useEffect, useState } from "react";
import { StreamerCard, CategoryNav } from "~/components";
import socketio from "../libs/socket_donator";

// TODO render the category page with a filter
function StreamerPage() {
  // ----------- STATES FOR CATEGORY NAV -----------
  const [categories, setCategories] = useState([
    "all",
    "gaming",
    "politics",
    "talk",
    "XXX",
  ]);
  // hardcoded numStreamers, change later
  const [numStreamers, setNumStreamers] = useState(2);
  const [languages, setLanguages] = useState(["German", "English", "French"]);
  const pictureLink = "https://i.imgur.com/8rU7ruv.jpeg";
  // TODO implement category pictures
  const [activeCategory, setActiveCategory] = useState("all");

  // ----------- STREAMERCARD -----------
  const [onlineStreamers, setOnlineStreamers] = useState(null);
  useEffect(() => {
    socketio.emitGetOnlineStreamers();
    socketio.onGetOnlineStreamer(setOnlineStreamers);
  }, []);

  function renderStreamerCards() {
    if (onlineStreamers) {
      return onlineStreamers.map((streamer) => {
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
  }
  return (
    <div className="flex">
      <CategoryNav
        activeCategory={activeCategory}
        stateSetter={setActiveCategory}
        categories={categories}
      />

      <div className="bg-xmrgray-darker">{renderStreamerCards()}</div>
    </div>
  );
}
export default StreamerPage;
