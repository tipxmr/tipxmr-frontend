import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import monerojs from "./libs/monero";
import socketio from "./libs/socket";

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

function App() {
  useIncomingTransaction(onIncomingTransaction);

  let walletUseEffectDidFire = false;
  const [donorInfo, setDonorInfo] = useState([]);
  const [donationsQueue, setDonationsQueue] = useState([]);
  const [donationsHistory, setDonationsHistory] = useState([]);

  const [customWallet, dispatch] = WalletContext.useWallet();

  const [streamerConfig, setStreamerConfig] = useState({
    hashedSeed: "", // acts as password for login
    displayName: "AlexAnarcho", // name to show to donator
    userName: "alexanarcho", // lowercase displayName
    isOnline: false, // show if streamer is currently able to recieve payments
    streamerSocketId: "",
    creationDate: "20.4.2020", // track since when the user is registered
    restoreHeight: 667580,
    profilePicture: "", // allow the user to upload a user avatar
    accountTier: {
      basic: true, // only basic functions available for customizations
      advanced: true, // more customisations
      premium: true, // all customisations available
    },
    stream: {
      url: "mydirtyhobby.com",
      platform: "twitch",
      language: "🇩🇪",
      description: "I am a great streamer.",
      category: "politics",
    },
    animationSettings: {
      secondPrice: 0.00043, // XMR price of a second of display time
      fontColor: "#F23456", // fontColor of the animation text
      fontSize: "xl", // size of animation text
      fontShadow: false, // enable a shadow around text
      minAmount: 0.00043, // donations must be equal to or greater than minAmount
      gifs: true, // allow users to include gifs as message
      gifsMinAmount: 0, // min amount to let user send a gif
      showGoal: false, // let the streamer decide whether to show a goal or not
      goal: 1, // goal amount in XMR
      goalProgress: 0, // how many XMR already paid towards goal
      goalReached: false, // maybe unnecessary, if true, reset the goal
      charLimit: 1000, // upperlimit for message length
      sound: "/src/sounds/crocodile.mp3", // custom mp3 sound, needs to be an attachement
      bgImg: "", // show background image in stream
    },
    donationStats: {
      totalDonations: 0, // increment with every donation
      largestDonation: 0, // show largest donation
      allDonations: [
        // objects of all transactions, basically array of donorInfo
        {
          1: {
            donor: "Grischa",
            message: "Hello",
            amount: 123, // amount in XMR
            date: "", // datetime object to track a timeline
          },
        },
      ],
    },
  });

  useEffect(() => {
    if (streamerConfig && streamerConfig.restoreHeight) {
      dispatch({
        type: "SET_RESTORE_HEIGHT",
        restoreHeight: streamerConfig.restoreHeight,
      });
    }
  }, [streamerConfig.restoreHeight]);

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
          const newDonation = {
            subaddress: subaddress,
            amount: parseFloat(output.amount) / Math.pow(10, 12), // convert Bigint to Int
            donor: donationsInfo.donor,
            message: donationsInfo.message,
            donatorSocketId: donationsInfo.donatorSocketId,
            userName: donationsInfo.userName,
            displayName: donationsInfo.displayName,
          };
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

  // as soon as wallet is loaded
  useEffect(() => {
    if (customWallet.wallet && walletUseEffectDidFire === false) {
      // after login send streamer info
      socketio.emitStreamerInfo(streamerConfig);
      // listen for new request of subaddress generation
      socketio.onCreateSubaddress(handleOnNewSubaddress);
      walletUseEffectDidFire = true;
    }
  }, [customWallet.wallet, walletUseEffectDidFire]);

  // handleChange for userConfig
  useEffect(() => {
    socketio.emitUpdateStreamerConfig(streamerConfig);
  }, [streamerConfig]);

  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <Header />
        <div className="flex-auto flex flex-col">
          <div className="flex flex-full">
            <Route path="/" exact>
              <Redirect to="/dashboard" />
            </Route>
            <Route path="/donate/:userName">
              <Donate />
            </Route>
            <Route path="/login">
              <Login
                streamerConfig={streamerConfig}
                setStreamerConfig={setStreamerConfig}
              />
            </Route>
            <Route path="/streamerpage" exact>
              <StreamerPage />
            </Route>
            <Route path="/animation" exact>
              <Animation streamerConfig={streamerConfig} />
            </Route>
            <PrivateRoute path="/dashboard">
              <Dashboard
                streamerConfig={streamerConfig}
                setStreamerConfig={setStreamerConfig}
              />
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
