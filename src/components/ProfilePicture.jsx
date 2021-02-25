// @ts-nocheck
import React from "react";
import { useStreamerState } from "../context/streamer";

function ProfilePicture() {
  const streamer = useStreamerState();
  if (streamer.profilePicture) {
    console.log("pic", streamer.profilePicture);
    return (
      <div className="flex">
        <img
          src={streamer.profilePicture}
          className="h-10 w-10 rounded-full mx-auto"
        />
      </div>
    );
  } else {
    return <div className="flex">Login</div>;
  }
}

export default ProfilePicture;
