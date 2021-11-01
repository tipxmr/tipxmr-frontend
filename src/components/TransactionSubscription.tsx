import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useWalletState } from "../context/wallet";
import useIncomingTransaction from "../hook/useIncomingTransaction";
import monerojs from "../libs/monero";
import socketio from "../libs/socket_streamer";
import Donation from "../models/Donation";
import { dispatcherState, donorsInfoState, streamerState } from "../store/atom";

const parseAmount = (amount) => {
  return parseFloat(amount) / Math.pow(10, 12);
}

const TransactionSubscription = () => {
  useIncomingTransaction(onIncomingTransaction);
  const streamerConfig = useRecoilValue(streamerState);
  const dispatcher = useRecoilValue(dispatcherState);
  const customWallet = useWalletState();
  const donorsInfo = useRecoilValue(donorsInfoState);
  console.log("donorsInfo", donorsInfo);

  const onIncomingTransaction = (tx) => {
    getNewOutput(tx);
  }

  const getNewOutput = (output) => {
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
