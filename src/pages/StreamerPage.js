import React, { useEffect, useState } from "react";
import { StreamerCard, CategoryNav } from "~/components";
import socketio from "../libs/socket";

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
        console.log("Streamer:", streamer);
        return <StreamerCard key={streamer.displayName} streamer={streamer} />;
      });
    }
    return null;
  }
  return (
    <div>
      <CategoryNav
        activeCategory={activeCategory}
        stateSetter={setActiveCategory}
        categories={categories}
      />

      <div className="w-3/4 mx-auto mt-3">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {renderStreamerCards()}
        </div>
      </div>
    </div>
  );
}
export default StreamerPage;
