import io from "socket.io-client";
const socketDonator = io("ws://localhost:3000/donator");
const socketStreamer = io("ws://localhost:3000/streamer");

// ===============================================================
// Streamer Functions
// ===============================================================

// socket.on functions
function onCreateSubaddress(callback) {
  socketStreamer.on("createSubaddress", (data) => {
    console.log("I have to create a subbaddress now");
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
function onRecieveStreamerFromBackend(callback) {
  socketDonator.on("recieveStreamer", (streamer) => {
    callback(streamer);
  });
}

function onSubaddressToDonator(callback) {
  socketDonator.on("subaddressToDonator", (data) => callback(data.subaddress));
}

/* function onPaymentRecieved(callback) {
  newDonation = {
            subaddress: subaddress,
            amount: output.amount,
            donor: donationsInfo.donor,
            message: donationsInfo.message,
          }; 
  socketDonator.on("paymentRecieved", (newDonation) => {
    callback(newDonation);
  });
} */

// donator recieves payment confirmation
function onPaymentConfirmation(callback) {
  socketDonator.on("paymentConfirmation", (confirmation) => {
    callback(confirmation);
  });
}

// socket.emit functions
function emitGetStreamer(userName) {
  socketDonator.emit("getStreamer", userName);
}

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
  emitGetStreamer,
  emitGetStreamerConfig,
  onRecieveStreamerConfig,
  emitUpdateStreamerConfig,
  emitStreamerInfo,
  emitPaymentRecieved,
  emitSubaddressToBackend,
  onRecieveStreamerFromBackend,
  onSubaddressToDonator,
  //onPaymentRecieved,
  onPaymentConfirmation,
  onCreateSubaddress,
  emitGetSubaddress,
  socketStreamer,
};