import { socketDonator } from "./socket";

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

function emitGetSubaddress(displayName, userName, _id, donor, message) {
  socketDonator.emit("getSubaddress", {
    donor,
    message,
    userName,
    displayName,
    _id,
  });
}

function emitGetOnlineStreamers() {
  socketDonator.emit("getOnlineStreamers");
}

export default {
  emitGetStreamer,
  onRecieveStreamerFromBackend,
  onSubaddressToDonator,
  onPaymentConfirmation,
  onGetOnlineStreamer,
  emitGetSubaddress,
  emitGetOnlineStreamers,
};
