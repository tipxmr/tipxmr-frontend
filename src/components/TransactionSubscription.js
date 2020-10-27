import React, { useEffect } from "react";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { dispatcherState, donorsInfoState, streamerState } from "../store/atom";
import Donation from "../models/Donation";
import monerojs from "../libs/monero";
import useIncomingTransaction from "../hook/useIncomingTransaction";
import { useWalletState } from "../context/wallet";
import socketio from "../libs/socket_streamer";

function parseAmount(amount) {
  return parseFloat(amount) / Math.pow(10, 12);
}

function TransactionSubscription() {
  useIncomingTransaction(onIncomingTransaction);
  const streamerConfig = useRecoilValue(streamerState);
  const dispatcher = useRecoilValue(dispatcherState);
  const customWallet = useWalletState();
  const donorsInfo = useRecoilValue(donorsInfoState);
  console.log("donorsInfo", donorsInfo);

  function onIncomingTransaction(tx) {
    getNewOutput(tx);
  }

  function getNewOutput(output) {
    monerojs
      .getSubaddress(customWallet.wallet, output.subaddressIndex)
      .then((subaddress) => {
        const donationsInfo = donorsInfo.find(
          (donationInfo) => donationInfo.subaddress === subaddress
        );
        if (donationsInfo !== undefined) {
          const newDonation = Donation.from({
            subaddress: subaddress,
            amount: parseAmount(output.amount),
            donor: donationsInfo.donor,
            message: donationsInfo.message,
            donatorSocketId: donationsInfo.donatorSocketId,
            userName: donationsInfo.userName,
            displayName: donationsInfo.displayName,
            duration:
              (parseAmount(output.amount) -
                streamerConfig.animationSettings.charPrice *
                  donationsInfo.message.length) /
              streamerConfig.animationSettings.secondPrice,
          });
          dispatcher.appendToDonationsQueue(newDonation);
          dispatcher.appendToDonationsHistory(newDonation);
          socketio.emitPaymentRecieved(newDonation);
        }
      });
  }

  useEffect(() => {
    // subscribe();
    return () => {
      // unsubscribe();
    };
  }, []);

  return null;
}

export default TransactionSubscription;
