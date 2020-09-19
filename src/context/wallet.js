import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import PropTypes from "prop-types";
import { MoneroWalletListener } from "monero-javascript";

// class IncomingLockedTxListener extends MoneroWalletListener {
class SynchronisationListener extends MoneroWalletListener {
  constructor(onProgress) {
    super();
    this.onProgress = onProgress;
  }

  onSyncProgress(height, startHeight, endHeight, percentDone, message) {
    this.onProgress(height, startHeight, endHeight, percentDone, message);
  }

  // onOutputReceived(output) {
  //   if (
  //     output.state.tx.state.inTxPool &&
  //     output.state.tx.state.isLocked &&
  //     output.state.tx.state.isIncoming
  //   ) {
  //     this.handleTx({
  //       subaddressIndex: output.getSubaddressIndex(),
  //       amount: output.getAmount(),
  //     });
  //   }
  // }
}

const WalletStateContext = createContext();
const WalletDispatchContext = createContext();

function walletReducer(state, action) {
  switch (action.type) {
    case "SET_WALLET":
      return { ...state, wallet: action.wallet };
      case "SET_RESTORE_HEIGHT":
        return { ...state, restoreHeight: action.restoreHeight };
    // case "increment":
    //   return { count: state.count + 1 };
    // case "decrement":
    //   return { count: state.count - 1 };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const isProduction = () => process.env.NODE_ENV === "production";
const isDevelopment = () => process.env.NODE_ENV === "development";

const withLogger = (reducer) => (state, action) => {
  const nextState = reducer(state, action);

  if (isDevelopment()) {
    // TODO: format properly
    console.log(action.type, state, nextState);
  }

  return nextState;
};

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
  return [useWalletState(), useWalletDispatch()];
}

function useWalletSynchronisation() {
  const wallet = useWalletState();
  const [isActive, setIsActive] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [progress, setProgress] = useState(0);

  function onProgress(height, startHeight, endHeight, percentDone, message) {
    // const percentage = Math.floor(percentDone * 100);
    const percentage =
      Math.round(
        ((height - startHeight + 1) / (endHeight - startHeight)) * 1000
      ) / 10.0;
    setProgress(percentage);

    if (percentDone === 1) {
      setIsDone(true);
    }
    // console.log("percentDone", percentDone, Math.floor(percentDone * 100), percentDone === 1);
  }

  async function start() {
    setIsDone(false);
    setIsActive(true);
    await wallet.wallet.setSyncHeight(wallet.restoreHeight);
    await wallet.wallet.startSyncing();
  }

  async function stop() {
    await wallet.wallet.stopSyncing();
    setIsActive(true);
  }

  useEffect(() => {
    const listener = new SynchronisationListener(onProgress);

    if (wallet.wallet) {
      wallet.wallet.addListener(listener);
    }

    return () => {
      if (wallet.wallet) {
        wallet.wallet.removeListener(listener);
      }
    };
  });

  return { start, stop, isActive, isDone, progress };
}

// async function updateWallet(dispatch) {
//   dispatch({ type: "start" });
//   dispatch({ type: "finish" });
//   dispatch({ type: "fail" });
// }

// function increment(dispatch) {
//   dispatch({ type: "increment" });
// }

// function decrement(dispatch) {
//   dispatch({ type: "decrement" });
// }

export {
  WalletProvider,
  useWalletState,
  useWalletDispatch,
  useWallet,
  useWalletSynchronisation,
  // increment,
  // decrement,
};

// walletVariables={{ streamerConfig, wallet, primaryAddress }}
//  walletVariables={{ isSyncActive, streamerConfig, wallet, primaryAddress, percentageSynced, }}

// walletVariables.wallet
// walletVariables.wallet
// walletVariables.wallet
// walletVariables.primaryAddress
// walletVariables.primaryAddress
