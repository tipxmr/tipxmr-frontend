import { call } from "file-loader";
import io from "socket.io-client";
const socketDonator = io("ws://localhost:3000/donator");
const socketStreamer = io("ws://localhost:3000/streamer");

// ===============================================================
// Streamer Functions
// ===============================================================

// socket.on functions
function onCreateSubaddress(callback) {
  socketStreamer.on("createSubaddress", (data) => {
    callback(data);
  });
}

function onRecieveStreamerConfig(callback) {
  socketStreamer.on("recieveStreamerConfig", (streamerConfig) => {
    callback(streamerConfig);
  });
}

// socket.emit functions
function emitGetStreamerConfig(hashedSeed) {
  socketStreamer.emit("getStreamerConfig", hashedSeed);
}

function emitUpdateStreamerConfig(streamerConfig) {
  socketStreamer.emit("updateConfig", streamerConfig);
}

function emitStreamerInfo(streamerConfig) {
  socketStreamer.emit("streamerInfo", streamerConfig);
}

function emitPaymentRecieved(newDonation) {
  /*newDonation = {
            subaddress: subaddress,
            amount: output.amount,
            donor: donationsInfo.donor,
            message: donationsInfo.message,
          }; */
  socketStreamer.emit("paymentRecieved", newDonation);
}

function emitSubaddressToBackend(newDonorInfo) {
  socketStreamer.emit("subaddressToBackend", newDonorInfo);
}

// ===============================================================
// Donator Functions
// ===============================================================

// socket.on functions
function onSubaddressToDonator(callback) {
  socketDonator.on("subaddressToDonator", (data) => callback(data.subaddress));
}

function onPaymentRecieved(callback) {
  /*newDonation = {
            subaddress: subaddress,
            amount: output.amount,
            donor: donationsInfo.donor,
            message: donationsInfo.message,
          }; */
  socketDonator.on("paymentRecieved", (newDonation) => {
    callback(newDonation);
  });
}

// socket.emit functions
function emitGetSubaddress(displayName, userName, hashedSeed, donor, message) {
  socketDonator.emit("getSubaddress", {
    displayName,
    userName,
    hashedSeed,
    donor,
    message,
  });
}

export default {
  emitGetStreamerConfig,
  onRecieveStreamerConfig,
  emitUpdateStreamerConfig,
  emitStreamerInfo,
  emitPaymentRecieved,
  emitSubaddressToBackend,
  onSubaddressToDonator,
  onPaymentRecieved,
  onCreateSubaddress,
  emitGetSubaddress,
};
