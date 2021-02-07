import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import { mergeDeepLeft } from "ramda";

const StreamerStateContext = createContext();
const StreamerUpdateContext = createContext();

function StreamerProvider({ children }) {
  const [state, setState] = useState({});

  return (
    <StreamerStateContext.Provider value={state}>
      <StreamerUpdateContext.Provider value={setState}>
        {children}
      </StreamerUpdateContext.Provider>
    </StreamerStateContext.Provider>
  );
}

StreamerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

function useStreamerState() {
  const context = useContext(StreamerStateContext);

  if (context === undefined) {
    throw new Error("useStreamerState must be used within a StreamerProvider");
  }

  return context;
}

function useStreamerUpdate() {
  const context = useContext(StreamerUpdateContext);

  if (context === undefined) {
    throw new Error("useStreamerUpdate must be used within a StreamerProvider");
  }

  return context;
}

function useStreamer() {
  return [useStreamerState(), useStreamerUpdate()];
}

function updateStreamer(update, values) {
  update((streamer) => mergeDeepLeft(values, streamer));
}

function updateRestoreHeight(update, restoreHeight) {
  update((streamer) => ({
    ...streamer,
    restoreHeight,
  }));
}

function updateHashedSeed(update, _id) {
  update((streamer) => ({
    ...streamer,
    _id,
  }));
}

function updateAnimationSettings(update, animationSettings) {
  update((streamer) => ({
    ...streamer,
    animationSettings: {
      ...streamer.animationSettings,
      ...animationSettings,
    },
  }));
}

export {
  StreamerProvider,
  useStreamerState,
  useStreamerUpdate,
  useStreamer,
  updateStreamer,
  updateHashedSeed,
  updateAnimationSettings,
};
