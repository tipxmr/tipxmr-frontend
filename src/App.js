import React, { useEffect, useRef } from "react";
import {
  Route,
  BrowserRouter as Router,
  Redirect,
  Switch,
} from "react-router-dom";
import monerojs from "./libs/monero";
import socketio from "./libs/socket_streamer";
import { Header, Footer, PrivateRoute } from "./components";
import {
  Animation,
  Dashboard,
  Donate,
  Disclaimer,
  FAQ,
  Login,
  StreamerPage,
  Logout,
  Landing,
} from "./pages";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  dispatcherState,
  streamerState,
  restoreHeightState,
  donorsInfoState,
} from "./store/atom";
import createDispatcher from "./store/dispatcher";
import { useWalletState } from "./context/wallet";

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
      streamerConfig.hashedSeed &&
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
    streamerConfig.hashedSeed,
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
    <div className="flex flex-col min-h-screen">
      <Router>
        {/* userName in Header is just for easier testing, remove for production */}
        <Header userName={streamerConfig.userName} />
        <div className="flex-auto flex flex-col bg-xmrgray-darker text-gray-200">
          <div className="flex flex-full">
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
              <Route path="/">
                <Redirect to="/dashboard" />
              </Route>
              <Route>
                <Redirect to="/" />
              </Route>
            </Switch>
          </div>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
