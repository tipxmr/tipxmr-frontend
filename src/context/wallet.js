import React, { createContext, useContext, useReducer } from "react";

const WalletStateContext = createContext();
const WalletDispatchContext = createContext();

function walletReducer(state, action) {
  switch (action.type) {
    case "":
      return {};
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function WalletProvider({ children }) {
  const [state, dispatch] = useReducer(walletReducer, {});

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
  return [useCountState(), useCountDispatch()];
}

async function updateWallet(dispatch) {
  dispatch({ type: "start" });
  dispatch({ type: "finish" });
  dispatch({ type: "fail" });
}

export { WalletProvider, useWalletState, useWalletDispatch, useWallet };

// walletVariables={{ streamerConfig, wallet, primaryAddress }}
//  walletVariables={{ isSyncActive, streamerConfig, wallet, primaryAddress, percentageSynced, }}

// walletVariables.wallet
// walletVariables.wallet
// walletVariables.wallet
// walletVariables.primaryAddress
// walletVariables.primaryAddress
