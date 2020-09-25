import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const StreamerStateContext = createContext();
const StreamerUpdateContext = createContext();

function StreamerProvider({ children }) {
  const [state, setState] = useState();

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

function updateMultiple(update, values) {
  update((streamer) => ({
    ...streamer,
    ...values,
  }));
}

function updateRestoreHeight(update, restoreHeight) {
  update((streamer) => ({
    ...streamer,
    restoreHeight,
  }));
}

function updateHashedSeed(update, hashedSeed) {
  update((streamer) => ({
    ...streamer,
    hashedSeed,
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
  updateHashedSeed,
};
