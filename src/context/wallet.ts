import React, { createContext, useContext } from "react";
import PropTypes from "prop-types";

import useThunkReducer from "../hook/useThunkReducer";
import monerojs from "../libs/monero";

const WalletStateContext = createContext();
const WalletDispatchContext = createContext();

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
        error: action.error,
      };
    }

    case actionTypes.success: {
      return {
        ...state,
        status: "resolved",
        wallet: action.wallet,
      };
    }

    case actionTypes.go: {
      return {
        ...state,
        status: "pending",
      };
    }

    case actionTypes.reset: {
      return { ...state, status: "idle", wallet: null, error: null };
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function WalletProvider({ children }) {
  const [state, dispatch] = useThunkReducer(reducer, {
    status: "idle",
    wallet: null,
    error: null,
  });

  const { status } = state;

  const isLoading = status === "idle" || status === "pending";
  const isIdle = status === "idle";
  const isPending = status === "pending";
  const isResolved = status === "resolved";
  const isRejected = status === "rejected";

  return (
    <WalletStateContext.Provider
      value={{
        ...state,
        status: { isLoading, isIdle, isPending, isResolved, isRejected },
      }}
    >
      <WalletDispatchContext.Provider value={dispatch}>
        {children}
      </WalletDispatchContext.Provider>
    </WalletStateContext.Provider>
  );
}

WalletProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

function useWalletState() {
  const context = useContext(WalletStateContext);

  if (context === undefined) {
    throw new Error("useWalletState must be used within a WalletProvider");
  }

  return context;
}

function useWalletDispatch() {
  const context = useContext(WalletDispatchContext);

  if (context === undefined) {
    throw new Error("useWalletDispatch must be used within a WalletProvider");
  }

  return context;
}

function useWallet() {
  return [useWalletState(), useWalletDispatch()];
}

function openFromSeed(seed) {
  return (dispatch) => {
    dispatch({ type: actionTypes.go });
    monerojs
      .openWalletFromSeed(seed)
      .then((wallet) => dispatch({ type: actionTypes.success, wallet }))
      .catch((error) => dispatch({ type: actionTypes.failure, error }));
  };
}

function create(language) {
  return (dispatch) => {
    dispatch({ type: actionTypes.go });
    monerojs
      .createWallet(language)
      .then((wallet) => dispatch({ type: actionTypes.success, wallet }))
      .catch((error) => dispatch({ type: actionTypes.failure, error }));
  };
}

function close() {
  return (dispatch) => {
    dispatch({ type: actionTypes.reset });
  };
}

export {
  WalletProvider,
  useWalletState,
  useWalletDispatch,
  useWallet,
  openFromSeed,
  create,
  close,
};
