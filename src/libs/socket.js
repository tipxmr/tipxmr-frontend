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
  socketStreamer.on("recieveStreamerConfig", (requestedStreamerConfig) => {
    callback(requestedStreamerConfig);
  });
}

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
            userName: donationsInfo.userName,
            displayName: donationsInfo.displayName,
          }; */
  socketStreamer.emit("paymentRecieved", newDonation);
}

function emitSubaddressToBackend(newDonorInfo) {
  socketStreamer.emit("subaddressToBackend", newDonorInfo);
}

function emitUpdateOnlineStatus(hashedSeed, newOnlineStatus) {
  socketStreamer.emit("updateOnlineStatus", { hashedSeed, newOnlineStatus });
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

// donator recieves payment confirmation
function onPaymentConfirmation(callback) {
  socketDonator.on("paymentConfirmation", (confirmation) => {
    callback(confirmation);
  });
}

function onGetOnlineStreamer(callback) {
  socketDonator.on("emitOnlineStreamers", (onlineStreamers) => {
    console.log("online Streamers:", onlineStreamers);
    callback(onlineStreamers);
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

function emitGetOnlineStreamers() {
  socketDonator.emit("getOnlineStreamers");
}

export default {
  emitGetStreamer,
  emitGetStreamerConfig,
  onRecieveStreamerConfig,
  emitUpdateStreamerConfig,
  emitUpdateOnlineStatus,
  emitStreamerInfo,
  emitPaymentRecieved,
  emitSubaddressToBackend,
  onRecieveStreamerFromBackend,
  onSubaddressToDonator,
  onPaymentConfirmation,
  onCreateSubaddress,
  onGetOnlineStreamer,
  emitGetSubaddress,
  emitGetOnlineStreamers,
  socketStreamer,
};
