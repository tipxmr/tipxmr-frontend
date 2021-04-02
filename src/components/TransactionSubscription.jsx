import { useEffect } from "react";
import Donation from "../models/Donation";
import monerojs from "../libs/monero";
// import useIncomingTransaction from "../hook/useIncomingTransaction";
import { useWalletState } from "../context/wallet";
import socketio from "../libs/socket_streamer";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../store";
import { actions } from "../store/slices/transaction";



function parseAmount(amount) {
  return parseFloat(amount) / Math.pow(10, 12);
}

function TransactionSubscription() {
  // useIncomingTransaction(onIncomingTransaction);
  const streamerConfig = useSelector(state => state.streamer);
  const dispatch = useAppDispatch();
  const customWallet = useWalletState();
  const donorsInfo = useSelector(state => state.transaction.donors);
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
          dispatch(actions.appendToQueue(newDonation));
          dispatch(actions.appendToHistory(newDonation));
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
