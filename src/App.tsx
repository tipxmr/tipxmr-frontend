import { useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Redirect, Route,
  Switch
} from "react-router-dom";
import { TipLayout, PrivateRoute } from "./components";
import { useWalletState } from "./context/wallet";
import monerojs from "./libs/monero";
import socketio from "./libs/socket_streamer";
import {
  Animation,
  Dashboard,
  Disclaimer, Donate,
  FAQ,
  Invoice, Landing, Login,
  Logout, StreamerPage
} from "./pages";

import { useAppDispatch, useAppSelector } from './store';
import { actions as txActions } from "./store/slices/transaction";
import { actions } from "./store/slices/restore-height";
// login, logout, send, RootState, 

function App() {
  const store = useAppSelector(x => x);
  console.log(store);
  const dispatch = useAppDispatch();

  const walletUseEffectDidFire = useRef(false);
  const customWallet = useWalletState();
  const streamerConfig = useAppSelector(state => state.streamer);
  const restoreHeight = useAppSelector(state => state.restoreHeight);
  

  // as soon as wallet is loaded
  useEffect(() => {
    const handleOnNewSubaddress = (data) => {
      monerojs.createSubaddress(customWallet.wallet).then((subaddress) => {
        const newDonorInfo = { ...data, subaddress: subaddress };
        dispatch(txActions.appendToDonors(newDonorInfo))
        socketio.emitSubaddressToBackend(newDonorInfo);
        console.log("created Subaddress for:", newDonorInfo);
      });
    }
    if (
      streamerConfig._id &&
      customWallet.wallet &&
      walletUseEffectDidFire.current === false
    ) {
      // listen for new request of subaddress generation
      socketio.onCreateSubaddress(handleOnNewSubaddress);

      walletUseEffectDidFire.current = true;
    }
  }, [
    customWallet.wallet,
    walletUseEffectDidFire,
    streamerConfig._id
  ]);

  // set restore height for wasm wallet
  useEffect(() => {
    if (
      streamerConfig &&
      streamerConfig.restoreHeight &&
      restoreHeight !== streamerConfig.restoreHeight
    ) {
      dispatch(actions.update(streamerConfig.restoreHeight))
    }
  }, [streamerConfig, restoreHeight]);

  return (
    <div>
      <Router>
        {/* userName in Header is just for easier testing, remove for production */}
        <TipLayout>
          <Switch>
            <PrivateRoute path="/dashboard">
              <Dashboard />
            </PrivateRoute>
            <Route path="/donate/:userName">
              <Donate />
            </Route>
            <Route path="/" exact>
              <Landing />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/streamerpage" exact>
              <StreamerPage />
            </Route>
            <Route path="/animation/:userName">
              <Animation />
            </Route>
            <Route path="/disclaimer">
              <Disclaimer />
            </Route>
            <Route path="/faq">
              <FAQ />
            </Route>
            <Route path="/logout">
              <Logout />
            </Route>
            <Route path="/invoice">
              <Invoice />
            </Route>
            <Route path="/">
              <Redirect to="/dashboard" />
            </Route>
            <Route>
              <Redirect to="/" />
            </Route>
          </Switch>
        </TipLayout>
      </Router>
    </div>
  );
}

export default App;
