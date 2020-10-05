import React from "react";
import { useStreamer, useStreamerState } from "../context/streamer";

function ProfilePicture() {
  const { profilePicture } = useStreamerState();
  if (profilePicture) {
    return (
      <div>
        <img
          src={profilePicture}
          alt="Account"
          className="h-16 w-16 rounded-full mx-auto"
        />
      </div>
    );
  } else {
    return "Account";
  }
}

export default ProfilePicture;
