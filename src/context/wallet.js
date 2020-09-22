import React, { createContext, useContext } from "react";
import PropTypes from "prop-types";

import useThunkReducer from "../hook/useThunkReducer";
import monerojs from "../libs/monero";

const WalletStateContext = createContext();
const WalletDispatchContext = createContext();

function walletReducer(state, action) {
  switch (action.type) {
    case "OPEN_WALLET":
      return { ...state, isLoading: true };

    case "CREATE_WALLET":
      return { ...state, isLoading: true };

    case "SET_WALLET":
      return { ...state, wallet: action.wallet, isLoading: false };

    case "CLEAR_WALLET":
      return { ...state, wallet: null };

    case "SET_RESTORE_HEIGHT":
      return { ...state, restoreHeight: action.restoreHeight };

    case "ERROR":
      return { ...state, error: action.error, isLoading: false };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const isProduction = () => process.env.NODE_ENV === "production";
const isDevelopment = () => process.env.NODE_ENV === "development";

const withLogger = (reducer) => (state, action) => {
  const nextState = reducer(state, action);

  if (isDevelopment()) {
    console.log(action.type, state, nextState);
  }

  return nextState;
};

function WalletProvider({ children }) {
  const initialState = {
    restoreHeight: 0,
    wallet: null,
    error: null,
    isLoading: false,
  };
  const [state, dispatch] = useThunkReducer(
    withLogger(walletReducer),
    initialState
  );

  return (
    <WalletStateContext.Provider value={state}>
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

function openWalletFromSeed(dispatch, seed) {
  dispatch({ type: "OPEN_WALLET" });
  monerojs
    .openWalletFromSeed(seed)
    .then((wallet) => {
      dispatch({ type: "SET_WALLET", wallet });
    })
    .catch((error) => {
      dispatch({ type: "ERROR", error });
    });
}

function createWallet(dispatch, language) {
  dispatch({ type: "CREATE_WALLET" });
  monerojs
    .createWallet(language)
    .then((wallet) => {
      dispatch({ type: "SET_WALLET", wallet });
    })
    .catch((error) => {
      dispatch({ type: "ERROR", error });
    });
}

function closeWallet() {
  return (dispatch, getState) => {
    const { wallet } = getState();

    const closeRequests = wallet
      .getListeners()
      .map((listener) => wallet.removeListener(listener));

    Promise.all(closeRequests)
      .then(() => wallet.close())
      .then(() => dispatch({ type: "CLEAR_WALLET" }))
      .catch(() => dispatch({ type: "CLEAR_WALLET" }));
  };
}

export {
  WalletProvider,
  useWalletState,
  useWalletDispatch,
  useWallet,
  openWalletFromSeed,
  createWallet,
  closeWallet,
};
