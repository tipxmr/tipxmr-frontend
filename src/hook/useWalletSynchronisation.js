import { useCallback, useEffect, useReducer, useRef } from "react";
import { MoneroWalletListener } from "monero-javascript";
import { diff as differ } from "deep-diff";

import { useWalletState } from "../context/wallet";

const isProduction = () => process.env.NODE_ENV === "production";
const isDevelopment = () => process.env.NODE_ENV === "development";

const dictionary = {
  E: {
    color: "#2196F3",
    text: "CHANGED:",
  },
  N: {
    color: "#4CAF50",
    text: "ADDED:",
  },
  D: {
    color: "#F44336",
    text: "DELETED:",
  },
  A: {
    color: "#2196F3",
    text: "ARRAY:",
  },
};

function style(kind) {
  return `color: ${dictionary[kind].color}; font-weight: bold`;
}

function render(diff) {
  const { kind, path, lhs, rhs, index, item } = diff;

  switch (kind) {
    case "E":
      return [path.join("."), lhs, "→", rhs];
    case "N":
      return [path.join("."), rhs];
    case "D":
      return [path.join(".")];
    case "A":
      return [`${path.join(".")}[${index}]`, item];
    default:
      return [];
  }
}

const withLogger = (reducer) => (state, action) => {
  const nextState = reducer(state, action);

  if (isDevelopment()) {
    const differences = differ(state, nextState) || [];

    console.groupCollapsed(
      `%c ${action.type}`,
      "color: gray; font-weight: lighter;"
    );
    if (differences.length) {
      console.groupCollapsed("diff");
      differences.forEach((element) => {
        const { kind } = element;
        const output = render(element);
        console.log(`%c ${dictionary[kind].text}`, style(kind), ...output);
      });
      console.groupEnd();
    }
    console.groupEnd();
  }

  return nextState;
};

class SynchronisationListener extends MoneroWalletListener {
  constructor(onProgress) {
    super();
    this.onProgress = onProgress;
  }

  onSyncProgress(height, startHeight, endHeight, percentDone, message) {
    this.onProgress(height, startHeight, endHeight, percentDone, message);
  }
}

function synchronisationReducer(state, action) {
  switch (action.type) {
    case "SET_IS_ACTIVE":
      return { ...state, isActive: action.isActive };
    case "SET_IS_DONE":
      return { ...state, isDone: action.isDone };
    case "SET_PROGRESS":
      return { ...state, progress: action.progress };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const reducer = withLogger(synchronisationReducer);

export function useWalletSynchronisation() {
  const listenerRef = useRef();
  const progressRef = useRef();
  const wallet = useWalletState();
  const [state, dispatch] = useReducer(reducer, {
    isActive: false,
    isDone: false,
    progress: 0,
  });

  progressRef.current = state.progress;

  function onProgress(height, startHeight, endHeight, percentDone, message) {
    const percentage = Math.floor(percentDone * 100);

    if (progressRef.current !== percentage) {
      dispatch({ type: "SET_PROGRESS", progress: percentage });
    }

    if (percentDone === 1) {
      dispatch({ type: "SET_IS_DONE", isDone: true });
    }
  }

  async function start() {
    dispatch({ type: "SET_IS_DONE", isDone: false });
    dispatch({ type: "SET_IS_ACTIVE", isActive: true });
    await wallet.wallet.setSyncHeight(wallet.restoreHeight);
    await wallet.wallet.startSyncing();
  }

  async function stop() {
    await wallet.wallet.stopSyncing();
    dispatch({ type: "SET_IS_ACTIVE", isActive: false });
  }

  useEffect(() => {
    listenerRef.current = new SynchronisationListener(onProgress);

    return () => {
      listenerRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (wallet.wallet) {
      wallet.wallet.addListener(listenerRef.current);
    }

    return () => {
      if (wallet.wallet) {
        wallet.wallet.removeListener(listenerRef.current);
      }
    };
  }, [wallet.wallet]);

  return { ...state, start, stop };
}

export default useWalletSynchronisation;
