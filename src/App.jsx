import React, { useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Redirect, Route,
  Switch
} from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Layout, PrivateRoute } from "./components";
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
import {
  dispatcherState,
  donorsInfoState, restoreHeightState, streamerState
} from "./store/atom";
import createDispatcher from "./store/dispatcher";

function App() {
  const [dispatcher, setDispatcher] = useRecoilState(dispatcherState);
  const dispatcherRef = useRef(createDispatcher());
  const walletUseEffectDidFire = useRef(false);
  const setDonorsInfo = useSetRecoilState(donorsInfoState);
  const [restoreHeight, setRestoreHeight] = useRecoilState(restoreHeightState);
  const customWallet = useWalletState();
  const streamerConfig = useRecoilValue(streamerState);

  useEffect(() => {
    setDispatcher(dispatcherRef.current);
  }, [setDispatcher]);

  // as soon as wallet is loaded
  useEffect(() => {
    function handleOnNewSubaddress(data) {
      monerojs.createSubaddress(customWallet.wallet).then((subaddress) => {
        const newDonorInfo = { ...data, subaddress: subaddress };
        setDonorsInfo((prevState) => [...prevState, newDonorInfo]);
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
    streamerConfig._id,
    dispatcher,
    setDonorsInfo,
  ]);

  // set restore height for wasm wallet
  useEffect(() => {
    if (
      streamerConfig &&
      streamerConfig.restoreHeight &&
      restoreHeight !== streamerConfig.restoreHeight
    ) {
      setRestoreHeight(streamerConfig.restoreHeight);
    }
  }, [streamerConfig, restoreHeight, setRestoreHeight]);

  return (
    <div>
      <Router>
        {/* userName in Header is just for easier testing, remove for production */}
        <Layout>
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
        </Layout>
      </Router>
    </div>
  );
}

export default App;
