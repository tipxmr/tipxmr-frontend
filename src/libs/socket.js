import io from "socket.io-client";
const socketDonator = io("ws://localhost:3000/donator");
const socketStreamer = io("ws://localhost:3000/streamer");

// ===============================================================
// Streamer Functions
// ===============================================================

// socket.on functions
function getSubaddress(callback) {
  socketStreamer.on("getSubaddress", (data) => {
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

function emitStreamerInfo(streamerName, hashedSeed) {
  socketStreamer.emit("streamerInfo", {
    streamerName,
    hashedSeed,
  });
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

function emitReturnSubaddress(newDonorInfo) {
  socketStreamer.emit("returnSubaddress", newDonorInfo);
}

// ===============================================================
// Donator Functions
// ===============================================================

// socket.on functions
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

export default {
  emitGetStreamerConfig,
  emitUpdateStreamerConfig,
  emitStreamerInfo,
  emitPaymentRecieved,
  emitReturnSubaddress,
  onPaymentRecieved,
  getSubaddress,
};
