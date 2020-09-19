import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

// use to log previous and next value
// function useStateWithCallback(initialState, callback) {
//   const [state, setState] = useState(initialState);

//   useEffect(() => callback(state), [state, callback]);

//   return [state, setState];
// }

function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}

const isProduction = () => process.env.NODE_ENV === "production";
const isDevelopment = () => process.env.NODE_ENV === "development";

function useStateWithPrevious(initialState) {
  const [state, setState] = useState({ value: initialState, label: "" });
  // const [state, setState] = useState(initialState);
  // const previous = usePrevious(state.value);

  function setStateWithLabel(newValue, label) {
    setState((oldState) => ({
      value: newValue(oldState.value),
      label,
    }));
  }

  if (isDevelopment()) {
    // console.log(state.label, previous, state.value);
  }

  return [state.value, setStateWithLabel];
}

const StreamerStateContext = createContext();
const StreamerUpdateContext = createContext();

function StreamerProvider({ children }) {
  const [state, setState] = useStateWithPrevious({ count: 1 });

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

// function increment(update) {
//   update(({ count }) => ({ count: count + 1 }), "increment");
// }

// function decrement(update) {
//   update(({ count }) => ({ count: count - 1 }), "decrement");
// }

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
  // increment,
  // decrement,
};

// restoreHeight
// hashedSeed

// animationSettings.secondPrice
// animationSettings.fontColor
// animationSettings.goalProgress
// animationSettings.sound
// animationSettings.goal
