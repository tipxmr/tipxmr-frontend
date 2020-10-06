import React from "react";
import { useStreamer, useStreamerState } from "../context/streamer";

function ProfilePicture() {
  const { profilePicture } = useStreamerState();
  console.log("pic", profilePicture);
  if (profilePicture) {
    return (
      <div className="flex">
        <img
          src={profilePicture}
          alt="Profile Picture"
          className="h-10 w-10 rounded-full mx-auto bg-white"
        />
      </div>
    );
  } else {
    return <div className="flex">"Account"</div>;
  }
}

export default ProfilePicture;
