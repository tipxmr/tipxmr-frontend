import React, { useState, useEffect, useRef } from "react";
import { Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import monerojs from "./libs/monero";
import socketio from "./libs/socket_streamer";
import Donation from "./models/Donation";

import * as WalletContext from "./context/wallet";

import { Header, Footer, PrivateRoute } from "./components";
import {
  Animation,
  Dashboard,
  Login,
  Donate,
  Disclaimer,
  FAQ,
  StreamerPage,
  Logout,
} from "./pages";

import useIncomingTransaction from "./hook/useIncomingTransaction";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { dispatcherState, streamerState } from "./store/atom";
import createDispatcher from "./store/dispatcher";

function App() {
  const setDispatcher = useSetRecoilState(dispatcherState);
  const dispatcherRef = useRef(createDispatcher());

  useIncomingTransaction(onIncomingTransaction);

  const walletUseEffectDidFire = useRef(false);
  const [donorInfo, setDonorInfo] = useState([]);
  const [donationsQueue, setDonationsQueue] = useState([]);
  const [donationsHistory, setDonationsHistory] = useState([]);

  const [customWallet, dispatch] = WalletContext.useWallet();

  const streamerConfig = useRecoilValue(streamerState);
  console.log("streamerConfig", streamerConfig);
  const dispatcher = useRecoilValue(dispatcherState);

  useEffect(() => {
    setDispatcher(dispatcherRef.current);
  }, [setDispatcher]);

  // as soon as wallet is loaded
  useEffect(() => {
    if (customWallet.wallet && walletUseEffectDidFire.current === false) {
      // after login send hashed seed, so the backend checks if user exists
      // backend will return either a default streamer config
      // or an existing streamer config
      if (streamerConfig.hashedSeed) {
        socketio.emitGetStreamerConfig(streamerConfig.hashedSeed);
        //socketio.onRecieveStreamerConfig(updateStreamerConfig);
        socketio.onRecieveStreamerConfig(dispatcher.updateStreamer);
        // listen for new request of subaddress generation
        socketio.onCreateSubaddress(handleOnNewSubaddress);
      }
      walletUseEffectDidFire.current = true;
    }
  }, [
    customWallet.wallet,
    walletUseEffectDidFire,
    handleOnNewSubaddress,
    streamerConfig.hashedSeed,
    dispatcher,
  ]);

  useEffect(() => {
    if (
      streamerConfig &&
      streamerConfig.restoreHeight &&
      customWallet.restoreHeight != streamerConfig.restoreHeight
    ) {
      dispatch({
        type: "SET_RESTORE_HEIGHT",
        restoreHeight: streamerConfig.restoreHeight,
      });
    }
  }, [
    streamerConfig,
    dispatch,
    streamerConfig.restoreHeight,
    customWallet.restoreHeight,
  ]);

  useEffect(() => {
    if (
      streamerConfig !== null &&
      customWallet.wallet &&
      walletUseEffectDidFire.current === true
    ) {
      console.log("streamer updated, sent to backend");
      socketio.emitUpdateStreamerConfig(streamerConfig);
    }
  }, [streamerConfig]);

  function onIncomingTransaction(tx) {
    getNewOutput(tx);
  }

  function getNewOutput(output) {
    console.log("getNewOutput aufgerufen, output:", output);
    monerojs
      .getSubaddress(customWallet.wallet, output.subaddressIndex)
      .then((subaddress) => {
        console.log("Donation an diese Subaddresse:", subaddress);
        console.log("donorInfo:", donorInfo);
        const donationsInfo = donorInfo.find(
          (donationInfo) => donationInfo.subaddress === subaddress
        );
        if (donationsInfo !== undefined) {
          const newDonation = Donation.from({
            subaddress: subaddress,
            amount: parseFloat(output.amount) / Math.pow(10, 12), // convert Bigint to Int
            donor: donationsInfo.donor,
            message: donationsInfo.message,
            donatorSocketId: donationsInfo.donatorSocketId,
            userName: donationsInfo.userName,
            displayName: donationsInfo.displayName,
            // Total Cost = (SecondPrice * Seconds) + (CharacterPrice * Characters)
            // Seconds = (TotalCost - (CharacterPrice * Characters)) / SecondPrice
            duration:
              (parseFloat(output.amount) / Math.pow(10, 12) -
                streamerConfig.animationSettings.charPrice *
                  donationsInfo.message.length) /
              streamerConfig.animationSettings.secondPrice,
          });
          console.log("New Donation:", newDonation);
          setDonationsQueue((previousArray) => [...previousArray, newDonation]);
          setDonationsHistory((previousArray) => [
            ...previousArray,
            newDonation,
          ]);
          console.log("donationsInfo:", donationsInfo);
          return newDonation;
        }
        return null;
      })
      .then((newDonation) => {
        if (newDonation !== null && newDonation !== undefined) {
          socketio.emitPaymentRecieved(newDonation);
        }
      });
  }

  function handleOnNewSubaddress(data) {
    monerojs.createSubaddress(customWallet.wallet).then((subaddress) => {
      const newDonorInfo = { ...data, subaddress: subaddress };
      setDonorInfo((previousArray) => [...previousArray, newDonorInfo]);
      socketio.emitSubaddressToBackend(newDonorInfo);
      console.log("created Subaddress for:", newDonorInfo);
    });
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        {/* userName in Header is just for easier testing, remove for production */}
        <Header userName={streamerConfig.userName} />
        <div className="flex-auto flex flex-col bg-xmrgray-darker text-gray-200">
          <div className="flex flex-full">
            <Route path="/" exact>
              <Redirect to="/dashboard" />
            </Route>
            <Route path="/donate/:userName">
              <Donate />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/streamerpage" exact>
              <StreamerPage />
            </Route>
            <Route path="/animation" exact>
              <Animation />
            </Route>
            <PrivateRoute path="/dashboard">
              <Dashboard />
            </PrivateRoute>
            <Route path="/disclaimer">
              <Disclaimer />
            </Route>
            <Route path="/faq">
              <FAQ />
            </Route>
            <Route path="/logout">
              <Logout />
            </Route>
          </div>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
