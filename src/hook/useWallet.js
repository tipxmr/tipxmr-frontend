import { useReducer, useRef } from "react";
import monerojs from "../libs/monero";

const actionTypes = {
  failure: "FAILURE",
  success: "SUCCESS",
  go: "GO",
  reset: "RESET",
};

function reducer(state, action) {
  switch (action.type) {
    case actionTypes.failure: {
      return {
        ...state,
        status: "rejected",
        reason: action.reason,
      };
    }

    case actionTypes.success: {
      return {
        ...state,
        status: "resolved",
        data: action.data,
      };
    }

    case actionTypes.go: {
      return {
        ...state,
        status: "pending",
      };
    }

    case actionTypes.reset: {
      return { ...state, status: "idle", data: null, reason: null };
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function useWallet() {
  const [state, dispatch] = useReducer(reducer, {
    status: "idle",
    data: null,
    reason: null,
  });

  const stateRef = useRef(state);
  const { status, data, reason } = stateRef;

  const isLoading = status === "idle" || status === "pending";
  const isIdle = status === "idle";
  const isPending = status === "pending";
  const isResolved = status === "resolved";
  const isRejected = status === "rejected";

  function openFromSeed(seed) {
    console.log("openFromSeed@useWallet");
    dispatch({ type: actionTypes.go });
    monerojs
      .openWalletFromSeed(seed)
      .then((data) => dispatch({ type: actionTypes.success, data }))
      .catch((reason) => dispatch({ type: actionTypes.failure, reason }));
  }

  function create(language) {
    dispatch({ type: actionTypes.go });
    monerojs
      .createWallet(language)
      .then((data) => dispatch({ type: actionTypes.success, data }))
      .catch((reason) => dispatch({ type: actionTypes.failure, reason }));
  }

  function close() {
    dispatch({ type: actionTypes.reset });
  }

  return {
    openFromSeed,
    create,
    close,
    wallet: data,
    error: reason,
    status: { isLoading, isIdle, isPending, isResolved, isRejected },
  };
}
export default useWallet;
